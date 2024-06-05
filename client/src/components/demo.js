import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./context";
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';

export function SwipeableTemporaryDrawer() {
    const history = useNavigate();
    const { logindata, setLoginData } = useContext(LoginContext);
    const handleProfile = () => {
        history('/profile');
    }
    const anchor = "right";
    const [state, setState] = React.useState({
        right: false,
    });

    const logout = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },

        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
        history('/')
    }


    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleProfile}>
                        <ListItemIcon><AccountCircleSharpIcon /></ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=> history('/yourposts')}>
                        <ListItemIcon><AccountCircleSharpIcon /></ListItemIcon>
                        <ListItemText primary={"Your Posts"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=> history('/savedposts')}>
                        <ListItemIcon><BookmarkSharpIcon /></ListItemIcon>
                        <ListItemText primary={"saved Posts"} />
                    </ListItemButton>
                </ListItem>

            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon><LogoutSharpIcon /></ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{ color: "black", border: "1px solid black", height: "40px", width: "40px" }}></MenuIcon></Button>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
