import React from "react";

/*
 * Connect to correct twitch chat, get emotes, set up chatbot, set up command to show emote.
 */

export const ShowEmote = (props) => {
    return (
        <div>
            <h1>{props.match.params.token}</h1>
        </div>
    );
};
