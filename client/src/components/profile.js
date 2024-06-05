import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar } from './navbar'
import Avatar from '@mui/material/Avatar';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { LoginContext } from './context';
import './styles.css'
import { useScrollTrigger } from '@mui/material';

export const Profile = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [details, setdetails] = useState({});
  const email = logindata.email;
  const history = useNavigate();
  const profileHandle = () => {
    history('/editprofile')
  }
  const fetchProfile = async () => {

    const res = await fetch(`http://localhost:8000/save/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();
    console.log(data);
    if (data.status === 401 || !data) {
      console.log("error")
    } else {
      console.log("data verify");
      setdetails(data.savedArticles);

    }
  }
  useEffect(() => {
    fetchProfile()
  }, []);

  return (
    <>
      <Navbar />
      <div className='cont' style={{ color: "white" }}>
        <div className='left' style={{ paddingLeft: "20px", paddingTop: "20px", marginTop: "80px", border: "none" }}>
          <AccountCircleSharpIcon style={{ height: "auto", width: "250px", maxWidth: "100%" }} />
          <h2>&nbsp;&nbsp;&nbsp;{logindata.name}</h2>
          <h3>&nbsp;&nbsp;&nbsp;{logindata.email}</h3>
        </div>

        <div className='right' style={{ marginTop: "80px", border: "none" }}>
          <div className='right-top' style={{ border: "none" }}>
            <button onClick={profileHandle} style={{ borderRadius: "10px", backgroundColor: "green", color: "white", position: "fixed", right: "150px", padding: "9px 20px" }}>Edit profile</button>
            <br></br>
            {details ?
              <div>
                <div style={{maxWidth:"700px",wordWrap:'break-word'}}>
                  <h3>About:</h3>
                  <span>{details.about}</span>
                  </div>
                    <h4>College:</h4>
                    <h5>{details.college}</h5>
                    <h4>Degree:</h4>
                    <h5>{details.degree}</h5>
                    <h4>Year of Graduation:</h4>
                    <h5>{details.year}</h5>
                    <h4>Skills:</h4>
                    <h5>{details.skills}</h5>
                  </div>:''
            }
                </div>
              </div>
      </div>

        </>
        )
}
