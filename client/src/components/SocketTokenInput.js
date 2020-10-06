import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import io from "socket.io-client";
import "../stylesheets/css/socketTokenInput.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

export const SocketTokenInput = () => {
    let user = useSelector((state) => state.user);
    const [socketError, setSocketError] = useState("");
    const [socketToken, setSocketToken] = useState("");

    //Sets up a socket connection with the token provided
    //If the socket connection is successful, the token is valid
    const validateToken = () => {
        const socket = io(
            `https://sockets.streamlabs.com?token=${socketToken}`
        );

        socket.on("connect", () => {
            //Valid token
            //send a request to API
            fetch(`${url}/api/goal/setSocketToken/${user}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ socketToken: socketToken }),
            })
                .then((response) => response.json())
                .then((json) => {
                    const history = createBrowserHistory();
                    history.go(0);
                });
        });

        socket.on("disconnect", () => {
            // Catches if the token is not valid
            setSocketError("Invalid Socket Token!");
        });
    };

    const handleChange = (e) => {
        setSocketToken(e.target.value);
    };

    //Gets token value from form
    //Validates the token value
    //If valid, send a put request updating the user's socketToken.
    const submitToken = () => {
        validateToken();
    };

    return (
        <div className="centeredContainer socketTokenContainer">
            <div className="socket-token">
                <h1>StreamLabs Socket Token Required!</h1>

                <p>
                    Please add your StreamLabs Socket Token to initialize your
                    goal bar.
                </p>

                <div className="socket-token-instructions">
                    <h3 className="instructions-header">
                        Steps to get your Socket Token
                    </h3>
                    <ol className="socket-token-steps">
                        <li>
                            Log into your account on{" "}
                            <a className="link" href="https://streamlabs.com">
                                StreamLabs
                            </a>
                            .
                        </li>
                        <li>Navigate to Settings.</li>
                        <li>Navigate to API Settings.</li>
                        <li>Navigate to API Tokens.</li>
                        <li>
                            Copy "Your Socket API Token" into the input field
                            below.
                        </li>
                    </ol>
                </div>

                <p>
                    <b class="link">
                        The Socket Token for your StreamLabs account is a
                        private token, only input your token if you are
                        comfortable with it being shared with me!
                    </b>
                </p>

                <form
                    id="socketTokenForm"
                    name="socketToken"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitToken();
                    }}
                >
                    <label class="formLabel">StreamLabs Socket API Token</label>
                    <input
                        type="password"
                        class={
                            socketError !== ""
                                ? "formInput token-input -active-error"
                                : "formInput token-input"
                        }
                        placeholder="Input token here"
                        onChange={handleChange}
                    ></input>

                    <span className="socket-error errorMessage">
                        {socketError}
                    </span>
                    <hr />
                    <div className="dashboardFooter">
                        <button type="submit" class="submitButton">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
