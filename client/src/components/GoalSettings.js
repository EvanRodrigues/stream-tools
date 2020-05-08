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
        <div id="formContainer" className="formContainer">
            <h1>Goal Settings</h1>

            <form id="goalSettings">
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

                <label>Text Color</label>
                <input id="text_color" className="inputColor" type="color" />

                <label>Background Color</label>
                <input id="empty_color" className="inputColor" type="color" />

                <label>Layer One Color</label>
                <input id="one_color" className="inputColor" type="color" />

                <label>Layer Two Color</label>
                <input id="two_color" className="inputColor" type="color" />

                <label>Layer Three Color</label>
                <input id="three_color" className="inputColor" type="color" />
            </form>

            <div className="sectionFooter">
                <button className="submitButton" id="submitGoalSettings">
                    Submit
                </button>
            </div>
        </div>
    );
};
