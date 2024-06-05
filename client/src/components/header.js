import React, { useContext } from 'react'
import "./header.css"
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import int from "./int.png"


export const Header = () => {

    return (
        <>
            <header>
                <nav>
                    <h1 style={{color:"whitesmoke",fontWeight:"bold",fontFamily:"serif",fontSize:"40px"}}>Interview Insights</h1>
                    <Link to='/'style={{color:"white",textDecoration:"none",fontSize:"20px",marginRight:"500px"}}>Home</Link>
                    <Link to='/login' style={{color:"white",textDecoration:"none"}}><h4>Signin→</h4></Link>
                </nav>
            </header>


        </>
    )
}