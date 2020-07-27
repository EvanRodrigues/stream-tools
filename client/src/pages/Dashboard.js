import React, { useState, useEffect } from "react";
import "../stylesheets/css/dashboard.css";
import { Nav } from "../components/Nav";
import { DisplayBar } from "../components/DisplayBar";
import { GoalSettings } from "../components/GoalSettings";
import { ColorSettings } from "../components/ColorSettings";

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
    const [channel, setChannel] = useState("");
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
    const token = props.match.params.token;

    const validateForms = () => {
        return colorError === "" && goalError === "" ? true : false;
    };

    const submitSettings = () => {
        if (validateForms() === false) return false;

        fetch(`${url}/api/goal/update/${channel}`, {
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
                console.log(json);
                window.location.reload();
            });
    };

    const submitDefaults = () => {
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

        fetch(`${url}/api/goal/update/${channel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(defaults),
        })
            .then((response) => response.json())
            .then((json) => {
                window.location.reload();
            });
    };

    useEffect(() => {
        //get initial values from db.
        fetch(`${url}/api/goal/match/${token}`)
            .then((response) => response.json())
            .then((json) => {
                setChannel(json["channel"]);
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

    if (name === null) return <></>;
    return (
        <div id="content">
            <Nav />

            <form id="settingsForm">
                <div id="settings">
                    <GoalSettings
                        progress={formatToTwoDecimals(progress)}
                        goal={formatToTwoDecimals(goal)}
                        setProgress={setProgress}
                        setGoal={setGoal}
                        setName={setName}
                        name={name}
                        error={goalError}
                        setError={setGoalError}
                    />

                    <DisplayBar
                        url={url}
                        channel={channel}
                        token={token}
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
