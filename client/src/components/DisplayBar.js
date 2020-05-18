import React from "react";

export const DisplayBar = (props) => {
    return (
        <div id="exampleBar" className="formContainer">
            <div className="headerContainer">
                <h1>Example Bar</h1>
            </div>

            <div id="barContainer">
                <div id="progressBar">
                    <div id="one"></div>
                    <div id="two"></div>
                    <div id="three"></div>

                    <div id="barTitle">
                        <span id="goalName">{props.name}</span>
                    </div>

                    <div id="barInfo">
                        <span id="current">{props.progress}</span>
                        <span id="goal">{props.goal}</span>
                    </div>
                </div>
            </div>

            <div className="sectionFooter">
                <button className="submitButton">Reset Bar</button>
            </div>
        </div>
    );
};
