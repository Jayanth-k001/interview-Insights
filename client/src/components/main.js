import React, { useEffect, useState, useContext } from 'react'
import { LoginContext } from './context'
import { Navbar } from './navbar'
import { useNavigate } from 'react-router-dom'
import { About } from './about'
import { Contact } from './contact'
import { Editpost } from './editpost'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PostCard } from './displaypost'

export const Main = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const email = logindata.email;
  const [posts, setposts] = useState([]);
  console.log(posts)
  const his = useNavigate();
  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:8000/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();
    if (data.status === 401 || !data) {
      console.log("error")
    } else {
      console.log("post fetched");
      setposts(data.data);

    }
  }
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <div className="container my-4 pt-50" style={{marginRight:"600px"}}>
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
          {posts.map((element) => {
            return (
             <>
             <div style={{paddingTop:"20px"}}><PostCard
                title={element.title}
                company={element.company}
                experience={element.experience}
                date={element.date}
                name={element.name}
                email={email}
             /></div>
              
              </>
            );
          })}

        </div>
      </div>
      <div style={{ position: "fixed", bottom: 70, right: 70 }}>
        <button style={{ backgroundColor: "rgb(61, 61, 61)", border: "none" }} onClick={() => his('/post')}><AddOutlinedIcon style={{ color: "white", fontSize: "70px" }} /></button>
      </div>
       
    </>
  )
}
