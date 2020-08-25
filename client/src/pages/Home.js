import React from "react";
import { useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import "../stylesheets/css/nav.css";

export const Home = () => {
    const isLogged = useSelector((state) => state.isLogged);

    if (isLogged === false) {
        return <Login />;
    }
    return (
        <>
            <Nav />
        </>
    );
};
