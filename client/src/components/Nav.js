import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <div id="nav">
            <ul className="linkContainer">
                <li className="navLink">Home</li>
                <li className="navLink">Goal</li>
                <li className="navLink">Emote Counter</li>
                <li className="navLink">Foo</li>
                <li className="navLink">Test</li>
            </ul>
        </div>
    );
};
