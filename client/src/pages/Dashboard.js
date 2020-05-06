import React, { useState, useEffect } from "react";
import "../stylesheets/css/dashboard.css";
import { Nav } from "../components/Nav";
import { DisplayBar } from "../components/DisplayBar";
import { GoalSettings } from "../components/GoalSettings";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

const formatToDollars = (number) => {
    return `$${number.toFixed(2)}`;
};

export const Dashboard = (props) => {
    const [progress, setProgress] = useState(0.0);
    const [goal, setGoal] = useState(0.0);
    const [name, setName] = useState("");
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
                console.log(json);

                setProgress(json["progress"]);
                setGoal(json["goal"]);
                setName(json["name"]);
            });
    }, []);

    return (
        <div id="content">
            <Nav />
            <div id="settings">
                <GoalSettings
                    progress={formatToDollars(progress)}
                    goal={formatToDollars(goal)}
                    name={name}
                />
                <DisplayBar
                    progress={formatToDollars(progress)}
                    goal={formatToDollars(goal)}
                    name={name}
                />
            </div>
        </div>
    );
};
