import React,{useContext, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import { LoginContext } from './context';
import { Navbar } from './navbar';
import { PostCard } from './displaypost';

export const Search = () => {
  const [posts,setposts]=useState([]);
    const { logindata, setLoginData } = useContext(LoginContext);
    const email=logindata.email;
    const location=useLocation();
    const query1 = new URLSearchParams(location.search).get('query');
    const query2 = encodeURIComponent(query1);
    let query = query2.replace(/%20/g, " ");
    console.log(query);
    const fetchposts=async()=>{
        const response=await fetch(`http://localhost:8000/search/${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          })
        const data=await response.json();
        console.log(data.searchedarticles)
        setposts(data.searchedarticles)
    }
    useEffect(()=>{
        fetchposts()
    },[query]);
  return (
    <>
         <Navbar />
            <br></br>
            <br></br>
            <div className="container my-4 pt-50" style={{ marginRight: "600px" }}>
                <br></br>
                <br></br>
                <br></br>
                <div className="row">
                    {posts.map((element) => {
                        return (
                            <>
                                <div style={{ paddingTop: "20px" }}><PostCard
                                    title={element.title}
                                    company={element.company}
                                    experience={element.experience}
                                    date={element.date}
                                    name={element.name}
                                    email={email}
                                    delete={false}
                                /></div>

                            </>
                        );
                    })}

                </div>
            </div>
            
    </>
  )
}
