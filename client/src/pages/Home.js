import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Nav } from "../components/Nav";
import { Login } from "../components/Login";
import { setColors } from "../actions/colors";
import { setGoal } from "../actions/goal";
import { setUser } from "../actions/user";
import { login } from "../actions/isLogged";
import "../stylesheets/css/nav.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

export const Home = (props) => {
    const cookies = new Cookies();
    let user = useSelector((state) => state.user);
    let isLogged = useSelector((state) => state.isLogged);
    let dispatch = useDispatch();

    const formatToTwoDecimals = (number) => {
        number = parseFloat(number);
        return number.toFixed(2);
    };

    const fetchUser = () => {
        //Get cookie if user is not set
        if (user === "") user = cookies.get("streamToolsUser");

        //Check if cookie is set
        if (user != null) {
            dispatch(setUser(user));
            dispatch(login());

            //Get initial values from db.
            fetch(`${url}/api/goal/match/${user}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 404) {
                        fetch(`${url}/api/goal/`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ channel: user }),
                        })
                            .then((userResponse) => userResponse.json())
                            .then((userJson) => {
                                dispatch(
                                    setGoal({
                                        progress: formatToTwoDecimals(
                                            userJson["progress"]
                                        ),
                                        target: formatToTwoDecimals(
                                            userJson["goal"]
                                        ),
                                        name: userJson["name"],
                                        accessToken: userJson["accessToken"],
                                        tokenSet: false,
                                    })
                                );

                                const colors = userJson["colors"];
                                dispatch(setColors(colors));
                            });
                    }
                })
                .then((json) => {
                    if (json == null) return;

                    dispatch(
                        setGoal({
                            progress: formatToTwoDecimals(json["progress"]),
                            target: formatToTwoDecimals(json["goal"]),
                            name: json["name"],
                            accessToken: json["accessToken"],
                            tokenSet: json["tokenSet"],
                        })
                    );

                    const colors = json["colors"];
                    dispatch(setColors(colors));
                });
        }
    };

    useEffect(fetchUser, []);

    if (isLogged === false) return <Login />;
    return (
        <>
            <Nav />
        </>
    );
};
