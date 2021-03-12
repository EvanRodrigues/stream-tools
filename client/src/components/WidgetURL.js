import React from "react";

export const WidgetURL = (props) => {
    return (
        <div id="widgetUrl" className="formContainer">
            <h1 className="url-header">Widget URL</h1>
            <div className="url-container">{props.url}</div>
        </div>
    );
};
