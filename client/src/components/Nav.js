import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { setUser } from "../actions/user";
import { logout } from "../actions/isLogged";

export const Nav = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(setUser(""));
        dispatch(logout());

        const cookies = new Cookies();
        cookies.remove("streamToolsUser");
    };

    return (
        <div id="nav">
            <ul className="linkContainer">
                <Link to="/">
                    <li className="navLink">Home</li>
                </Link>
                <Link to="/goal">
                    <li className="navLink">Goal Dashboard</li>
                </Link>
                <li className="loginInfo">
                    {user} |{" "}
                    <span id="navLogout" onClick={logoutUser}>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
    );
};
