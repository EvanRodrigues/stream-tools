import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import { SocketTokenInput } from "../components/SocketTokenInput";
import { DisplayBar } from "../components/DisplayBar";
import { GoalSettings } from "../components/GoalSettings";
import { ColorSettings } from "../components/ColorSettings";
import io from "socket.io-client";
import "../stylesheets/css/dashboard.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

const socketUrl =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5001" //dev
        : "https://stream-tools-socket.herokuapp.com/"; //live

let socket;

export const Dashboard = (props) => {
    let user = useSelector((state) => state.user);

    let progress = useSelector((state) => state.goal.progress);
    let target = useSelector((state) => state.goal.target);
    let name = useSelector((state) => state.goal.name);
    let token = useSelector((state) => state.goal.accessToken);
    let tokenSet = useSelector((state) => state.goal.tokenSet);

    let textColor = useSelector((state) => state.colors.textColor);
    let backgroundColor = useSelector((state) => state.colors.backgroundColor);
    let layerOneColor = useSelector((state) => state.colors.layerOneColor);
    let layerTwoColor = useSelector((state) => state.colors.layerTwoColor);
    let layerThreeColor = useSelector((state) => state.colors.layerThreeColor);

    const [goalError, setGoalError] = useState("");
    const [colorError, setColorError] = useState("");

    const defaults = {
        progress: 0,
        goal: 100,
        name: "Test Goal",
        colors: {
            textColor: "#000000",
            backgroundColor: "#e6e6e6",
            layerOneColor: "#00ff00",
            layerTwoColor: "#ff3333",
            layerThreeColor: "#cc00ff",
        },
    };

    const validateForms = () => {
        return colorError === "" && goalError === "" ? true : false;
    };

    const submitSettings = () => {
        if (validateForms() === false) return false;

        fetch(`${url}/api/goal/update/${user}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                progress: progress,
                goal: target,
                name: name,
                colors: {
                    textColor: textColor,
                    backgroundColor: backgroundColor,
                    layerOneColor: layerOneColor,
                    layerTwoColor: layerTwoColor,
                    layerThreeColor: layerThreeColor,
                },
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                socket.emit("refresh");
                const history = createBrowserHistory();
                history.go(0);
            });
    };

    const submitDefaults = () => {
        fetch(`${url}/api/goal/update/${user}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(defaults),
        })
            .then((response) => response.json())
            .then((json) => {
                const history = createBrowserHistory();
                history.go(0);
                socket.emit("refresh");
            });
    };

    if (socket == null && token !== "") {
        socket = io(`${socketUrl}?refresh=true&token=${token}`);
    }

    /*
     * If user goes to this page before logging in, they will be prompted to login.
     */
    if (user === "" || user === null) {
        return (
            <div id="content">
                <Login />
            </div>
        );
    } else if (tokenSet === false)
        //setTimeout to avoid seeing the SocketTokenInput component every submit/refresh.
        setTimeout(() => {
            return (
                <div id="content">
                    <Nav />
                    <SocketTokenInput />
                </div>
            );
        }, 1000);
    return (
        <div id="content">
            <Nav />
            <form
                id="settingsForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitSettings();
                }}
            >
                <div id="settings">
                    <div id="widgetUrl" className="formContainer">
                        <h1 className="url-header">Widget URL</h1>
                        <div className="url-container">
                            {`${window.location.origin}/widgets/goal/${token}`}
                        </div>
                    </div>

                    <GoalSettings
                        progress={progress}
                        target={target}
                        name={name}
                        error={goalError}
                        setError={setGoalError}
                    />

                    <DisplayBar
                        url={url}
                        channel={user}
                        progress={progress}
                        goal={target}
                        name={name}
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        layerOneColor={layerOneColor}
                        layerTwoColor={layerTwoColor}
                        layerThreeColor={layerThreeColor}
                        token={token}
                    />

                    <ColorSettings
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        layerOneColor={layerOneColor}
                        layerTwoColor={layerTwoColor}
                        layerThreeColor={layerThreeColor}
                        error={colorError}
                        setError={setColorError}
                    />
                </div>

                <hr />
                <div className="dashboardFooter">
                    <button
                        type="button"
                        className="submitButton"
                        id="defaultSubmitButton"
                        onFocus={submitDefaults}
                    >
                        Defaults
                    </button>
                    <button
                        type="button"
                        className="submitButton"
                        id="submitGoalSettings"
                        onFocus={submitSettings}
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};
