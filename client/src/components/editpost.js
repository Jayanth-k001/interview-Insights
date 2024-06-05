import React,{useContext,useState} from 'react'
import { LoginContext } from './context';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Navbar } from './navbar';

export const Editpost = (props) => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const email=logindata.email;
  const name=logindata.name;
  const his=useNavigate();
  const [input, setInput] = useState({
    title: "",
    company: "",
    experience: "",
}
)
const setVal = (e) => {
    const { name, value } = e.target;

    setInput(() => {
        return { ...input, [name]: value }
    })

}
  const makepost=async()=>{
    const {title,company,experience}=input;
    const data=await fetch('http://localhost:8000/post',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
             name, email, title,company,experience
            })
        })
            const res= await data.json();
            if (res.status === 201) {
                toast.success("post posted successfully 😃!", {
                    position: "top-center"
                });
                setInput({ ...input, name: "", email: "", password: "", cpassword: "" });
                his('/main');
            }
  }

  return (
    <>
    <Navbar/>
      <section style={{ marginTop: "100px" }}>
        <div className='form_data '>
        <button style={{backgroundColor: "rgb(75, 75, 75)",border: "none",marginLeft:"400px"}} onClick={()=> his('/main')}>
              <CloseIcon style={{color: "white", fontSize: "50px"}} />
            </button>
            <div className='form_input'>
              <label htmlFor='title'>Job Role:</label>
              <input type='text' name='title' id='title' onChange={setVal} placeholder='Your job role' required></input>
            </div>
            <div className='form_input'>
              <label htmlFor='company'>company:</label>
              <input type='text' name='company' id='company' onChange={setVal} placeholder='Company name' required></input>
            </div>
            <div className='form_input'>
              <textarea  name='experience' rows="10" cols="62" id="textarea" onChange={setVal} placeholder='Share your experience' required></textarea>
            </div>

            <button className='button' onClick={makepost}>Post</button>
          <br></br>
          <ToastContainer/>
        </div>
      </section>
    </>
  )
}
