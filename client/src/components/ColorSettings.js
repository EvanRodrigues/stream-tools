import React, { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import "../stylesheets/css/dashboard.css";

export const ColorSettings = (props) => {
    return (
        <div id="colorSettings" className="formContainer dashboardContainer">
            <h1>Color Settings</h1>

            <ColorInput
                label="Text Color"
                name="textColor"
                color={props.textColor}
                setColor={props.setTextColor}
                setError={props.setError}
            />
            <ColorInput
                label="Background Color"
                name="backgroundColor"
                color={props.backgroundColor}
                setColor={props.setBackgroundColor}
                setError={props.setError}
            />
            <ColorInput
                label="Layer One Color"
                name="layerOneColor"
                color={props.layerOneColor}
                setColor={props.setLayerOneColor}
                setError={props.setError}
            />
            <ColorInput
                label="Layer Two Color"
                name="layerTwoColor"
                color={props.layerTwoColor}
                setColor={props.setLayerTwoColor}
                setError={props.setError}
            />
            <ColorInput
                label="Layer Three Color"
                name="layerThreeColor"
                color={props.layerThreeColor}
                setColor={props.setLayerThreeColor}
                setError={props.setError}
            />

            <span id="colorError" className="errorMessage">
                {props.error}
            </span>
        </div>
    );
};

export default ColorSettings;
