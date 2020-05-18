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
    const [progress, setProgress] = useState(0.0);
    const [goal, setGoal] = useState(0.0);
    const [name, setName] = useState(null);
    const [textColor, setTextColor] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [layerOneColor, setLayerOneColor] = useState("");
    const [layerTwoColor, setLayerTwoColor] = useState("");
    const [layerThreeColor, setLayerThreeColor] = useState("");
    const token = props.match.params.token;

    useEffect(() => {
        //get initial values from db.
        fetch(`${url}/api/goal/match/${token}`)
            .then((response) => response.json())
            .then((json) => {
                setProgress(json["progress"]);
                setGoal(json["goal"]);
                setName(json["name"]);
            });
    }, []);

    if (name === null) return <></>;
    return (
        <div id="content">
            <Nav />
            <div id="settings">
                <GoalSettings
                    progress={formatToTwoDecimals(progress)}
                    goal={formatToTwoDecimals(goal)}
                    setProgress={setProgress}
                    setGoal={setGoal}
                    setName={setName}
                    name={name}
                />

                <DisplayBar
                    progress={formatToDollars(progress)}
                    goal={formatToDollars(goal)}
                    name={name}
                />

                <ColorSettings />
            </div>
        </div>
    );
};
