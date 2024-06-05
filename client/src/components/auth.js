import { useEffect, useState,useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { LoginContext } from './context';
import { useNavigate } from 'react-router-dom';
const google = window.google;

export const Auth = () => {
    const [user,setuser]=useState({});
    const his=useNavigate();
    const {logindata,setLoginData}=useContext(LoginContext);

    function handleCallbackResponse(response){
      console.log("encoded" + response.credential);
      var userObject=jwtDecode(response.credential);
      console.log(userObject);
      setuser(userObject);
      const name=userObject.name;
      const email=userObject.email;
      const details={name,email};
      console.log(details);
      setLoginData(details);
      his('/main')
      document.getElementById("signInDiv").hidden=true;
    }
  
    function handleSignOut(event){
      setuser({});
      document.getElementById("signInDiv").hidden=false;
    }
    useEffect(()=>{
      google.accounts.id.initialize({
          client_id: "873672677246-hgve0r88lv1qr0oe1rreib5h2ta2pvvg.apps.googleusercontent.com",
          callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme:"outline", size:"large"}
      )
    },[]);
  
      
    return (
      <>
       <div className='App'> 
          <div id="signInDiv"> 
  
          </div>
          { Object.keys(user).length!=0 && <button onClick={(e)=> handleSignOut(e)}>Logout</button>}
      </div>
      </>
    );
}
