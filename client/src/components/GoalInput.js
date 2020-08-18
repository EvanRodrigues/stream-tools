import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgress, setTarget, setName } from "../actions/goal";

export const GoalInput = (props) => {
    const dispatch = useDispatch();

    const validateName = (nameInput) => {
        if (nameInput.length === 0)
            props.setError("Goal Name can not be empty!");
        else props.setError("");
    };

    const validateDollars = (dollarInput) => {
        const dollarRegex = /^\d+\.\d\d$/;

        if (dollarRegex.test(dollarInput) === false) {
            props.setError("Progress and Goal Target not formatted correctly!");
        } else {
            props.setError("");
        }
    };

    const updateInput = (event) => {
        switch (props.name) {
            case "progress":
                validateDollars(event.target.value);
                return dispatch(setProgress(event.target.value));
            case "target":
                validateDollars(event.target.value);
                return dispatch(setTarget(event.target.value));
            case "name":
                validateName(event.target.value);
                return dispatch(setName(event.target.value));
            default:
                return;
        }
    };

    return (
        <div className="goalInput">
            <label className="formLabel">{props.label}</label>
            <input
                className="barInput"
                type="text"
                name={props.name}
                value={props.value}
                onChange={updateInput}
            ></input>
        </div>
    );
};
