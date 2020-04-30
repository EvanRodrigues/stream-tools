import React from "react";
import "./App.css";
import GoalBar from "./pages/GoalBar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/goal/:token" component={GoalBar} />
                    <Route path="/dashboard/:token" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
