import React, { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "../config/keys";

export const LogIn = () => {
    const redirect_uri = `${window.location.origin}/LogIn`;
    const [url, setUrl] = useState(
        `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=user:read:email`
    );
    const [loggedIn, setLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        let currentUrl = new URL(window.location.href);
        const code = currentUrl.searchParams.get("code");
        const accessRedirect = window.location.origin;

        const accessUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;

        if (code) {
            fetch(accessUrl, { method: "POST" })
                .then((response) => response.json())
                .then((json) => {
                    setAccessToken(json["access_token"]);

                    fetch(`https://api.twitch.tv/helix/users`, {
                        headers: {
                            "Client-ID": CLIENT_ID,
                            Authorization: `Bearer ${json["access_token"]}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json);
                            setUser(json["data"][0]["login"]);
                            setLoggedIn(true);
                            window.location.href = accessRedirect;
                        });
                });
        }
    }, []);

    return <></>;
};
