import React, { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import "../stylesheets/css/nav.css";
import { CLIENT_ID } from "../config/keys";

export const Home = () => {
    const redirect_uri = `${window.location.origin}/LogIn`;
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [url, setUrl] = useState(
        `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=user:read:email`
    );

    const LogOut = () => {
        setLoggedIn(false);
    };

    if (loggedIn === false) {
        return (
            <div>
                <h1>YOU NEED TO LOG IN!</h1>
                <a href={url}>Log In</a>
            </div>
        );
    }
    return (
        <>
            <Nav />
            <h2>{user}</h2>
            <a onClick={LogOut}>Log Out</a>
        </>
    );
};
