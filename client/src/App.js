import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import GoalBar from "./pages/GoalBar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setColors } from "./actions/color";
import { setGoal } from "./actions/goal";
import { fetched } from "./actions/isFetched";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

function App() {
    let user = useSelector((state) => state.user);
    let isFetched = useSelector((state) => state.isFetched);
    let dispatch = useDispatch();

    console.log(isFetched);

    const formatToTwoDecimals = (number) => {
        number = parseFloat(number);
        return number.toFixed(2);
    };

    const fetchUser = () => {
        //get initial values from db.
        fetch(`${url}/api/goal/match/${user}`)
            .then((response) => response.json())
            .then((json) => {
                dispatch(
                    setGoal({
                        progress: formatToTwoDecimals(json["progress"]),
                        goal: formatToTwoDecimals(json["goal"]),
                        name: json["name"],
                    })
                );

                const colors = json["colors"];
                dispatch(setColors(colors));
                dispatch(fetched());
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (user != null && isFetched == false) fetchUser();
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
