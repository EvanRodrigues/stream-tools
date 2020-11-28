import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GoalBar from "./pages/GoalBar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { ShowEmote } from "./pages/ShowEmote";
import { ShowEmoteSettings } from "./pages/ShowEmoteSettings";
import { setColors } from "./actions/colors";
import { setGoal } from "./actions/goal";
import { setUser } from "./actions/user";
import { login } from "./actions/isLogged";
import { setLoading } from "./actions/loading";
import "./App.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

export const App = () => {
    const cookies = new Cookies();
    let user = useSelector((state) => state.user);
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
            dispatch(setLoading(true));
            dispatch(setUser(user));
            dispatch(login());

            //Get initial values from db.
            fetch(`${url}/api/goal/match/${user}`)
                .then((response) => response.json())
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
                    dispatch(setLoading(false));
                })
                .catch((err) => {
                    dispatch(setLoading(false));
                });
        }
    };

    useEffect(fetchUser, []);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/LogIn" component={LogIn} />
                    <Route path="/goal" exact component={Dashboard} />
                    <Route
                        path="/ShowEmote"
                        exact
                        component={ShowEmoteSettings}
                    />
                    <Route path="/widgets/goal/:token" component={GoalBar} />
                    <Route
                        path="/widgets/ShowEmote/:token"
                        component={ShowEmote}
                    ></Route>
                    <Route path="/dashboard/:token" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
