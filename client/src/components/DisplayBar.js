import React from "react";

export const DisplayBar = (props) => {
    const formatToDollars = (number) => {
        number = parseFloat(number);

        //Default to $0.00 if input field is empty string
        if (isNaN(number.toFixed(2))) {
            const zero = 0.0;
            return `$${zero.toFixed(2)}`;
        }

        return `$${number.toFixed(2)}`;
    };

    const resetBar = () => {
        const url = `${props.url}/api/goal/reset/${props.channel}`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: props.token }),
        })
            .then((response) => response.json())
            .then((json) => {
                window.location.reload();
            });
    };

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
                        <span id="current">
                            {formatToDollars(props.progress)}
                        </span>
                        <span id="goal">{formatToDollars(props.goal)}</span>
                    </div>
                </div>
            </div>

            <div className="sectionFooter">
                <button className="submitButton" onFocus={resetBar}>
                    Reset Bar
                </button>
            </div>
        </div>
    );
};
