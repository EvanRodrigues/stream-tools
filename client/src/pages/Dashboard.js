import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import "../stylesheets/css/dashboard.css";
import { Nav } from "../components/Nav";
import { DisplayBar } from "../components/DisplayBar";
import { GoalSettings } from "../components/GoalSettings";
import { ColorSettings } from "../components/ColorSettings";
import { setUser } from "../actions/user";
import { login } from "../actions/isLogged";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

const formatToTwoDecimals = (number) => {
    return number.toFixed(2);
};

const formatToDollars = (number) => {
    //Default to $0.00 if input field is empty string
    if (isNaN(number.toFixed(2))) {
        const zero = 0.0;
        return `$${zero.toFixed(2)}`;
    }

    return `$${number.toFixed(2)}`;
};

export const Dashboard = (props) => {
    let user = useSelector((state) => state.user);
    const [progress, setProgress] = useState(0.0);
    const [goal, setGoal] = useState(0.0);
    const [name, setName] = useState(null);
    const [textColor, setTextColor] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [layerOneColor, setLayerOneColor] = useState("");
    const [layerTwoColor, setLayerTwoColor] = useState("");
    const [layerThreeColor, setLayerThreeColor] = useState("");
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
                goal: goal,
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

    useEffect(() => {
        if (user === "") {
            const cookies = new Cookies();
            user = cookies.get("streamToolsUser");

            if (user != null) {
                dispatch(setUser(user));
                dispatch(login());
            }
        }

        //get initial values from db.
        fetch(`${url}/api/goal/match/${user}`)
            .then((response) => response.json())
            .then((json) => {
                setProgress(json["progress"]);
                setGoal(json["goal"]);
                setName(json["name"]);

                const colors = json["colors"];
                setTextColor(colors["textColor"]);
                setBackgroundColor(colors["backgroundColor"]);
                setLayerOneColor(colors["layerOneColor"]);
                setLayerTwoColor(colors["layerTwoColor"]);
                setLayerThreeColor(colors["layerThreeColor"]);
            });
    }, []);

    if (user === "" || user === null) {
        return (
            <>
                <Redirect to="/" />
            </>
        );
    } else if (name === null)
        return (
            <div id="content">
                <Nav />
            </div>
        );
    return (
        <div id="content">
            <Nav />

            <form id="settingsForm">
                <div id="settings">
                    <GoalSettings
                        progress={formatToTwoDecimals(progress)}
                        goal={formatToTwoDecimals(goal)}
                        name={name}
                        setProgress={setProgress}
                        setGoal={setGoal}
                        setName={setName}
                        error={goalError}
                        setError={setGoalError}
                    />

                    <DisplayBar
                        url={url}
                        channel={user}
                        progress={formatToDollars(progress)}
                        goal={formatToDollars(goal)}
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
                        setTextColor={setTextColor}
                        setBackgroundColor={setBackgroundColor}
                        setLayerOneColor={setLayerOneColor}
                        setLayerTwoColor={setLayerTwoColor}
                        setLayerThreeColor={setLayerThreeColor}
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
