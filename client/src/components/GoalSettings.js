import React, { useState, useEffect } from "react";

export const GoalSettings = (props) => {
    const [inputProgress, setInputProgress] = useState(0.0);
    const [inputName, setInputName] = useState("");
    const [inputGoal, setInputGoal] = useState("");

    const updateProgress = (event) => {
        setInputProgress(event.target.value);
        props.setProgress(parseFloat(event.target.value));
    };

    const updateGoal = (event) => {
        setInputGoal(event.target.value);
        props.setGoal(parseFloat(event.target.value));
    };

    const updateName = (event) => {
        setInputName(event.target.value);
        props.setName(event.target.value);
    };

    useEffect(() => {
        setInputProgress(props.progress);
        setInputGoal(props.goal);
        setInputName(props.name);
    }, []);

    return (
        <div
            id="goalSettingsContainer"
            className="formContainer dashboardContainer"
        >
            <h1>Goal Settings</h1>

            <form id="goalSettingsForm">
                <label>Progress</label>
                <input
                    id="progress"
                    className="barInput"
                    type="text"
                    value={inputProgress}
                    onChange={updateProgress}
                />

                <label>Goal Target</label>
                <input
                    id="goal_target"
                    className="barInput"
                    type="text"
                    value={inputGoal}
                    onChange={updateGoal}
                />

                <label>Goal Name</label>
                <input
                    id="goal_name"
                    className="barInput"
                    type="text"
                    value={inputName}
                    onChange={updateName}
                />
            </form>

            <div className="sectionFooter">
                <button className="submitButton" id="submitGoalSettings">
                    Submit
                </button>
            </div>
        </div>
    );
};
