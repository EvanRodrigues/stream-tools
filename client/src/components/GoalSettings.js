import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoalInput } from "./GoalInput";

export const GoalSettings = (props) => {
    return (
        <div
            id="goalSettingsContainer"
            className="formContainer dashboardContainer"
        >
            <h1>Goal Settings</h1>

            <GoalInput
                label="Progress"
                value={props.progress}
                name="progress"
                error={props.error}
                setError={props.setError}
            />
            <GoalInput
                label="Goal Target"
                value={props.target}
                name="target"
                error={props.error}
                setError={props.setError}
            />
            <GoalInput
                label="Goal Name"
                value={props.name}
                name="name"
                error={props.error}
                setError={props.setError}
            />
            <GoalInput
                label="Font (not used)"
                value=""
                name="font"
                error={props.error}
                setError={props.setError}
            />
            <GoalInput
                label="Font Size (not used)"
                value=""
                name="fontSize"
                error={props.error}
                setError={props.setError}
            />

            <span id="goalError" className="errorMessage">
                {props.error}
            </span>
        </div>
    );
};
