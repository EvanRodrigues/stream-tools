import React from "react";
import { useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { WidgetURL } from "../components/WidgetURL";

export const ShowEmoteSettings = () => {
    let token = useSelector((state) => state.goal.accessToken);

    return (
        <div id="content">
            <Nav />

            <WidgetURL
                url={`${window.location.origin}/widgets/ShowEmote/${token}`}
            />
            <h1>Show Emote Settings!</h1>
        </div>
    );
};
