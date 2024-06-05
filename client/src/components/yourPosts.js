import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from './context'
import { Navbar } from './navbar';
import { PostCard } from './displaypost';
import { About } from './about';
import { Contact } from './contact';

export const YourPosts = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [posts, setposts] = useState([]);
    const name = logindata.name;
    const email = logindata.email;
    const fetchposts = async () => {
        const res = await fetch(`http://localhost:8000/yourpost/${email}`, {
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
            setposts(data.savedArticles.posts);
            console.log(data.savedArticles.posts);

        }
    }
    useEffect(() => {
        fetchposts()
    }, []);
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
                                    name={name}
                                /></div>

                            </>
                        );
                    })}

                </div>
            </div>
            
        </>
    )
}
