import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Cookies from "universal-cookie";
import GoalBar from "./pages/GoalBar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setColors } from "./actions/colors";
import { setGoal } from "./actions/goal";
import { fetched } from "./actions/isFetched";
import { setUser } from "./actions/user";
import { login } from "./actions/isLogged";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

function App() {
    const cookies = new Cookies();
    let user = useSelector((state) => state.user);
    let isFetched = useSelector((state) => state.isFetched);
    let dispatch = useDispatch();

    const formatToTwoDecimals = (number) => {
        number = parseFloat(number);
        return number.toFixed(2);
    };

    const fetchUser = () => {
        //Get cookie if user is not set
        if (user == "") user = cookies.get("streamToolsUser");

        //Check if cookie is set
        if (user != null) {
            dispatch(setUser(user));
            dispatch(login());

            //Get initial values from db.
            fetch(`${url}/api/goal/match/${user}`)
                .then((response) => response.json())
                .then((json) => {
                    dispatch(
                        setGoal({
                            progress: formatToTwoDecimals(json["progress"]),
                            target: formatToTwoDecimals(json["goal"]),
                            name: json["name"],
                        })
                    );

                    const colors = json["colors"];
                    dispatch(setColors(colors));
                    dispatch(fetched());
                });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (user != null && isFetched === false) {
        fetchUser();
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/LogIn" component={LogIn} />
                    <Route path="/goal" component={Dashboard} />
                    <Route path="/widgets/goal/:token" component={GoalBar} />
                    <Route path="/dashboard/:token" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
