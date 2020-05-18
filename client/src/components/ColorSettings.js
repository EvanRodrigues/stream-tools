import React, { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import "../stylesheets/css/dashboard.css";

export const ColorSettings = () => {
    const [textColor, setTextColor] = useState("#fff");
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [oneColor, setOneColor] = useState("#fff");
    const [twoColor, setTwoColor] = useState("#fff");
    const [threeColor, setThreeColor] = useState("#fff");

    useEffect(() => {
        //TODO: fetch api call to get colors once I update the db to store colors.
    }, []);

    if (textColor === "") return <>Loading...</>;
    return (
        <div id="colorSettings" className="formContainer dashboardContainer">
            <h1>Color Settings</h1>

            <ColorInput id="textColor" label="Text Color" color={textColor} />
            <ColorInput label="Background Color" color={backgroundColor} />
            <ColorInput label="Layer One Color" color={oneColor} />
            <ColorInput label="Layer Two Color" color={twoColor} />
            <ColorInput label="Layer Three Color" color={threeColor} />
        </div>
    );
};

export default ColorSettings;
