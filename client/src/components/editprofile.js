import React, { useContext, useState, useEffect } from 'react'
import './styles.css'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from './context';

export const Editprofile = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const name = logindata.name;
    const email = logindata.email;
    const [details, setdetails] = useState({});
    const his = useNavigate();
    const [input, setInput] = useState({
        about: "",
        college: "",
        degree: "",
        year: "",
        skills: "",
    }
    )
    const setVal = (e) => {
        const { name, value } = e.target;

        setInput(() => {
            return { ...input, [name]: value }
        })

    }
    const save = async () => {
        const { about, college, degree, year, skills } = input;
        const data = await fetch('http://localhost:8000/save', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, about, college, degree, year, skills
            })
        })
        const data1 = await data.json();
        if (data1.status == 201) {
            alert("profile updated successfully");
            his('/profile');
        }
        else {
            alert('error in saving profile');
        }
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
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Profile</h1>
                    </div>
                    <button style={{ backgroundColor: "rgb(75, 75, 75)", border: "none", marginLeft: "400px" }} onClick={() => his('/profile')}>
                        <CloseIcon style={{ color: "white", fontSize: "50px" }} />
                    </button>

                    <div className='form_input'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={logindata.name} id='name' placeholder='Enter Your name' readOnly></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={logindata.email} placeholder='Enter Your Email Address' readOnly></input>
                    </div>
                    <div className='form_input'>
                        <label for="about">About</label>
                        <br></br>
                        <textarea id="about" name="about" onChange={setVal} value={input.about} rows="4" cols="66" placeholder='about yourself'>
                        </textarea>

                    </div>
                    <div className='form_input'>
                        <label htmlFor='clg'>College</label>
                        <input type='text' name='college' id='clg' onChange={setVal} value={input.college} placeholder='College name' ></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='degree'>Degree</label>
                        <input type='text' name='degree' id='degree' onChange={setVal} value={input.degree} placeholder="B.tech/B.E/B.com/BCA/BSc" ></input>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='year'>Graduation year</label>
                        <input type='year' name='year' id='year' onChange={setVal} value={input.year} placeholder='YYYY' ></input>
                    </div>
                    <div className='form_input'>
                        <label for="skills">Skills</label>
                        <br></br>
                        <textarea id="skills" name="skills" rows="4" onChange={setVal} value={input.skills} cols="66" placeholder='Skills you own'>
                        </textarea>
                    </div>
                    <button className='button' onClick={save}>Save</button>

                    <ToastContainer />
                </div>
            </section>
        </>
    )
}
