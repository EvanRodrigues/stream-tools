import React from "react";

export const ShowEmote = (props) => {
    return (
        <div>
            <h1>{props.match.params.token}</h1>
        </div>
    );
};
