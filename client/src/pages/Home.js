import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import "../stylesheets/css/nav.css";
import { login } from "../actions/isLogged";
import { setUser } from "../actions/user";

export const Home = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.isLogged);
    let user = useSelector((state) => state.user);

    useEffect(() => {
        const cookies = new Cookies();
        user = cookies.get("streamToolsUser");

        if (user != null) {
            dispatch(setUser(user));
            dispatch(login());
        }
    }, []);

    if (isLogged === false) {
        return <Login />;
    }
    return (
        <>
            <Nav />
        </>
    );
};
