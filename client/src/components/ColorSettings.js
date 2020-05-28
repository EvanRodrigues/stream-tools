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
            />
            <ColorInput
                label="Background Color"
                name="backgroundColor"
                color={props.backgroundColor}
                setColor={props.setBackgroundColor}
            />
            <ColorInput
                label="Layer One Color"
                name="layerOneColor"
                color={props.layerOneColor}
                setColor={props.setLayerOneColor}
            />
            <ColorInput
                label="Layer Two Color"
                name="layerTwoColor"
                color={props.layerTwoColor}
                setColor={props.setLayerTwoColor}
            />
            <ColorInput
                label="Layer Three Color"
                name="layerThreeColor"
                color={props.layerThreeColor}
                setColor={props.setLayerThreeColor}
            />
        </div>
    );
};

export default ColorSettings;
