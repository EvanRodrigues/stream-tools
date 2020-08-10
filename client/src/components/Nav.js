import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Nav = () => {
    const user = useSelector((state) => state.user);

    const logout = () => {};

    return (
        <div id="nav">
            <ul className="linkContainer">
                <Link to="/">
                    <li className="navLink">Home</li>
                </Link>
                <Link to="/dashboard/123">
                    <li className="navLink">Goal</li>
                </Link>
                <Link to="/goal">
                    <li className="navLink">Goal Dynamic</li>
                </Link>
                <li className="navLink">Emote Counter</li>
                <li className="navLink">Foo</li>
                <li className="navLink">Test</li>
                <li className="loginInfo">
                    {user} | <a id="navLogout">Logout</a>
                </li>
            </ul>
        </div>
    );
};
