import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import { CLIENT_ID, CLIENT_SECRET } from "../config/keys";
import { setUser } from "../actions/user";
import { login } from "../actions/isLogged";

//TODO: Set up a socket with the backend.
//send info for the login request to backend.
//backend handles the request.
//sends result to frontend.
//this should work in development and production.

const socketUrl =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5001" //dev
        : "https://stream-tools-socket.herokuapp.com/"; //live

let socket;

export const LogIn = () => {
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    useEffect(() => {
        let currentUrl = new URL(window.location.href);
        const code = currentUrl.searchParams.get("code");
        const redirectUri = `${window.location.origin}/LogIn`;

        if (code) {
            socket = io(
                `${socketUrl}?login=true&code=${code}&redirectUri=${redirectUri}`
            );
            socket.on("userInfo", (eventData) => {
                const accessToken = eventData.token;

                fetch(`https://api.twitch.tv/helix/users`, {
                    headers: {
                        "Client-ID": CLIENT_ID,
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        const user = json["data"][0]["login"];
                        dispatch(setUser(user));
                        dispatch(login());
                        const cookies = new Cookies();

                        cookies.set("streamToolsUser", user, { path: "/" });
                        socket.disconnect();
                    });
            });
        }
    }, []);

    if (isLogged === false) {
        return <></>;
    }
    return (
        <>
            <Redirect to="/" />
        </>
    );
};
