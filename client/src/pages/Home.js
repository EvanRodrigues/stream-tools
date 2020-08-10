import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "../components/Nav";
import "../stylesheets/css/nav.css";
import { CLIENT_ID } from "../config/keys";
import { logout } from "../actions/isLogged";
import { setUser } from "../actions/user";

export const Home = () => {
    const dispatch = useDispatch();
    const redirect_uri = `${window.location.origin}/LogIn`;
    const isLogged = useSelector((state) => state.isLogged);
    const user = useSelector((state) => state.user);
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=user:read:email`;

    if (isLogged === false) {
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
            <h2>LOGGED IN AS: {user}</h2>
            <a
                onClick={() => {
                    dispatch(setUser(""));
                    dispatch(logout());
                }}
            >
                Log Out
            </a>
        </>
    );
};
