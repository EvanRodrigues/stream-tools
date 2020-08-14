import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Nav } from "../components/Nav";
import "../stylesheets/css/nav.css";
import { CLIENT_ID } from "../config/public/publicKeys";
import { login } from "../actions/isLogged";
import { setUser } from "../actions/user";

export const Home = () => {
    const dispatch = useDispatch();
    const redirect_uri = `${window.location.origin}/LogIn`;
    const isLogged = useSelector((state) => state.isLogged);
    let user = useSelector((state) => state.user);
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=user:read:email`;

    useEffect(() => {
        const cookies = new Cookies();
        user = cookies.get("streamToolsUser");

        if (user != null) {
            dispatch(setUser(user));
            dispatch(login());
        }
    }, []);

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
        </>
    );
};
