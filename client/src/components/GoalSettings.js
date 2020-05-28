import React, { useState, useEffect } from "react";
import { GoalInput } from "./GoalInput";

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
        </div>
    );
};
