import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import io from "socket.io-client";

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
        <form
            id="socketTokenForm"
            name="socketToken"
            onSubmit={(e) => {
                e.preventDefault();
                submitToken();
            }}
        >
            <label>StreamLabs Socket Token</label>
            <input type="password" onChange={handleChange}></input>
            <input type="submit" value="Submit" />
            <span className="error">{socketError}</span>
        </form>
    );
};
