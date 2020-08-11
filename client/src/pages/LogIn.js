import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { CLIENT_ID, CLIENT_SECRET } from "../config/keys";
import { setUser } from "../actions/user";
import { login } from "../actions/isLogged";

export const LogIn = () => {
    const redirect_uri = `${window.location.origin}/LogIn`;
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();

    useEffect(() => {
        let currentUrl = new URL(window.location.href);
        const code = currentUrl.searchParams.get("code");
        const accessUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;

        if (code) {
            fetch(accessUrl, { method: "POST" })
                .then((response) => response.json())
                .then((json) => {
                    fetch(`https://api.twitch.tv/helix/users`, {
                        headers: {
                            "Client-ID": CLIENT_ID,
                            Authorization: `Bearer ${json["access_token"]}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            const user = json["data"][0]["login"];
                            dispatch(setUser(user));
                            dispatch(login());
                            const cookies = new Cookies();

                            cookies.set("streamToolsUser", user, { path: "/" });
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
