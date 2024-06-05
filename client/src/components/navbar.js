import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Engagespot } from "@engagespot/react-component";
import { useNavigate } from 'react-router-dom';
import { SwipeableTemporaryDrawer } from './demo';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';


export const Navbar = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const [query, setQuery] = useState('');
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = () => {
        history(`/display?query=${query}`);

    }

    const goDash = () => {
        history("/general")
    }

    const goprofile = () => {
        history('/profile');
    }

    const saved = () => {
        history('/saved');
    }

    const theme = {
        notificationButton: {
            iconFill: 'black',
        },
        colors: {
            brandingPrimary: '#5350f6',
            colorSecondary: '#ecebfa',
        },
        feedItem: {
            hoverBackground: '#ecebfa',
        },
        dropdown: {
            hoverBackground: '#ecebfa',
            menuItemHoverBackground: '#ecebfa',
        },
    };

    return (
        < nav className="navbar navbar-expand-lg navbar-light bg-secondary fixed-top" >
            <div className="container-fluid">
                <h2>Interview Insights</h2>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ marginLeft: "40px" }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" ><Link className="nav-link h5 " to="/main">Home</Link></li>
                    </ul>
                    <div class="d-flex" >
                        <input class="form-control me-2" onKeyDown={(e) => {
                            e.keyCode === 13 && e.shiftKey === false && handleSearch();
                        }} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by company names" aria-label="Search" />
                        <button class="btn btn-outline bg-dark text-light me-5" type="submit" onClick={handleSearch}>Search</button>
                    </div>
                    <div style={{fontSize:"50px"}}>
                        <Engagespot
                            apiKey="nwn8qie9j1joc2wn6gtyg"
                            userId={logindata.email}
                            theme={theme}
                            
                        />

                    </div>
                    {/* <div className='avtar'>

                        {
                            logindata ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div> */}
                    <SwipeableTemporaryDrawer />
                </div>
            </div>
        </nav >
    )


}