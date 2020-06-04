import React, { useState, useEffect } from "react";
import { GoalInput } from "./GoalInput";

export const GoalSettings = (props) => {
    const [inputProgress, setInputProgress] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputGoal, setInputGoal] = useState("");

    const updateProgress = (event) => {
        validateDollars(event.target.value);
        setInputProgress(event.target.value);
        props.setProgress(parseFloat(event.target.value));
    };

    const updateGoal = (event) => {
        validateDollars(event.target.value);
        setInputGoal(event.target.value);
        props.setGoal(parseFloat(event.target.value));
    };

    const updateName = (event) => {
        validateName(event.target.value);
        setInputName(event.target.value);
        props.setName(event.target.value);
    };

    const validateName = (nameInput) => {
        if (nameInput.length == 0)
            props.setError("Goal Name can not be empty!");
        else props.setError("");
    };

    const validateDollars = (dollarInput) => {
        const dollarRegex = /^\d+\.\d\d$/;

        if (dollarRegex.test(dollarInput) == false) {
            props.setError("Progress and Goal Target not formatted correctly!");
        } else {
            props.setError("");
        }
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

            <GoalInput
                label="Progress"
                value={inputProgress}
                update={updateProgress}
                name="progress"
            />
            <GoalInput
                label="Goal Target"
                value={inputGoal}
                update={updateGoal}
                name="goal"
            />
            <GoalInput
                label="Goal Name"
                value={inputName}
                update={updateName}
                name="name"
            />
            <GoalInput label="Font (not used)" value="" name="font" />
            <GoalInput label="Font Size (not used)" value="" name="fontSize" />

            <span id="goalError" className="errorMessage">
                {props.error}
            </span>
        </div>
    );
};
