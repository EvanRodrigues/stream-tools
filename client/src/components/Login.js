import React from "react";
import { CLIENT_ID } from "../config/public/publicKeys";
import "../stylesheets/css/login.css";

export const Login = () => {
    const redirectUri = `${window.location.origin}/LogIn`;
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email`;

    return (
        <div class="centeredContainer loginContainer">
            <div id="login">
                <h1 className="loginHeader">Welcome to Stream Tools!</h1>

                <div className="site-info">
                    <p className="text site-info-entry">
                        This is a platform that I've developed to distribute my
                        Twitch.tv widgets for anyone to use on their stream.
                        Make sure you have a{" "}
                        <a href="https://twitch.tv" className="link">
                            Twitch
                        </a>{" "}
                        account before trying to set up any widgets.
                    </p>

                    <p className="text site-info-entry">
                        Currently the only widget available is a fundraising
                        goal bar. In order to use the bar, make sure you have a{" "}
                        <a href="https://streamlabs.com" className="link">
                            StreamLabs
                        </a>{" "}
                        account.
                    </p>
                </div>

                <h2 className="loginHeader">Login to Stream Tools</h2>
                <a href={url}>
                    <button className="twitch-login-button">
                        <i className="fab fa-twitch"></i>
                        <span>Twitch Login</span>
                    </button>
                </a>
            </div>
        </div>
    );
};
