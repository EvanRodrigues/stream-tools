import React from "react";

export const GoalSettings = (props) => {
    return (
        <div id="formContainer" className="formContainer">
            <h1>Goal Settings</h1>

            <form id="goalSettings">
                <label>Progress</label>
                <input
                    id="progress"
                    className="barInput"
                    type="text"
                    value={props.progress}
                />

                <label>Goal Target</label>
                <input
                    id="goal_target"
                    className="barInput"
                    type="text"
                    value={props.goal}
                />

                <label>Goal Name</label>
                <input
                    id="goal_name"
                    className="barInput"
                    type="text"
                    value={props.name}
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
