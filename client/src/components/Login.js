import React from "react";
import { CLIENT_ID } from "../config/public/publicKeys";

export const Login = () => {
    const redirectUri = `${window.location.origin}/LogIn`;
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email`;

    return (
        <div>
            <h1>YOU NEED TO LOG IN!</h1>
            <a href={url}>Log In</a>
        </div>
    );
};
