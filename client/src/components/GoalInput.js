import React from "react";

export const GoalInput = (props) => {
    return (
        <div className="goalInput">
            <label className="formLabel">{props.label}</label>
            <input
                className="barInput"
                type="text"
                name={props.name}
                value={props.value}
                onChange={props.update}
            ></input>
        </div>
    );
};
