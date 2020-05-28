import React, { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import "../stylesheets/css/dashboard.css";

export const ColorSettings = (props) => {
    return (
        <div id="colorSettings" className="formContainer dashboardContainer">
            <h1>Color Settings</h1>

            <ColorInput
                id="textColor"
                label="Text Color"
                color={props.textColor}
                setColor={props.setTextColor}
            />
            <ColorInput
                label="Background Color"
                color={props.backgroundColor}
                setColor={props.setBackgroundColor}
            />
            <ColorInput
                label="Layer One Color"
                color={props.layerOneColor}
                setColor={props.setLayerOneColor}
            />
            <ColorInput
                label="Layer Two Color"
                color={props.layerTwoColor}
                setColor={props.setLayerTwoColor}
            />
            <ColorInput
                label="Layer Three Color"
                color={props.layerThreeColor}
                setColor={props.setLayerThreeColor}
            />
        </div>
    );
};

export default ColorSettings;
