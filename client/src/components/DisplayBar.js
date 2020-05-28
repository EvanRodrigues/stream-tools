import React from "react";

export const DisplayBar = (props) => {
    return (
        <div id="exampleBar" className="formContainer">
            <div className="headerContainer">
                <h1>Example Bar</h1>
            </div>

            <div id="barContainer">
                <div
                    id="progressBar"
                    style={{ backgroundColor: props.backgroundColor }}
                >
                    <div
                        id="one"
                        style={{ backgroundColor: props.layerOneColor }}
                    ></div>
                    <div
                        id="two"
                        style={{ backgroundColor: props.layerTwoColor }}
                    ></div>
                    <div
                        id="three"
                        style={{ backgroundColor: props.layerThreeColor }}
                    ></div>

                    <div id="barTitle" style={{ color: props.textColor }}>
                        <span id="goalName">{props.name}</span>
                    </div>

                    <div id="barInfo" style={{ color: props.textColor }}>
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
