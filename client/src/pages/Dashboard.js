import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
import "../stylesheets/css/dashboard.css";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import { DisplayBar } from "../components/DisplayBar";
import { GoalSettings } from "../components/GoalSettings";
import { ColorSettings } from "../components/ColorSettings";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

export const Dashboard = (props) => {
    let user = useSelector((state) => state.user);
    let isFetched = useSelector((state) => state.isFetched);

    let progress = useSelector((state) => state.goal.progress);
    let target = useSelector((state) => state.goal.target);
    let name = useSelector((state) => state.goal.name);

    let textColor = useSelector((state) => state.colors.textColor);
    let backgroundColor = useSelector((state) => state.colors.backgroundColor);
    let layerOneColor = useSelector((state) => state.colors.layerOneColor);
    let layerTwoColor = useSelector((state) => state.colors.layerTwoColor);
    let layerThreeColor = useSelector((state) => state.colors.layerThreeColor);

    const [goalError, setGoalError] = useState("");
    const [colorError, setColorError] = useState("");
    const dispatch = useDispatch();

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
            method: "POST",
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
                const history = createBrowserHistory();
                history.go(0);
            });
    };

    const submitDefaults = () => {
        fetch(`${url}/api/goal/update/${user}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(defaults),
        })
            .then((response) => response.json())
            .then((json) => {
                const history = createBrowserHistory();
                history.go(0);
            });
    };

    /*
     * If user goes to this page before logging in, the component will mount.
     * useEffect will not fire twice, so this if statement fetches the user's data.
     */
    if (user === "" || user === null) {
        return <Login />;
    } else if (isFetched === false) return <div id="content"></div>;
    return (
        <div id="content">
            <Nav />

            <form id="settingsForm">
                <div id="settings">
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
