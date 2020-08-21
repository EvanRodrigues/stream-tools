import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Transition } from "react-transition-group";
import io from "socket.io-client";
import "../stylesheets/css/goalBar.css";

const url =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5000" //dev
        : window.location.origin; //live

const socketUrl =
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:5001" //dev
        : "https://stream-tools-socket.herokuapp.com/"; //live

let socket;

class GoalBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "",
            progress: 0,
            goal: 0,
            goalName: "",
            colors: {},
            animatedBar: false,
            //Formats the goal and progress to two decimal places to show cents.
            formatToDollars: function (number) {
                return `$${number.toFixed(2)}`;
            },
        };
    }

    //Sets a limit of 100% width for each layer of the GoalBar.
    limitWidth = (width) => {
        return width > 100 ? 100 : width;
    };

    //Fetch call to update the goal's progress.
    updateProgress = (progress) => {
        const totalProgress = this.state.progress + progress;

        this.setState({ ...this.state, progress: totalProgress });
    };

    fetchGoal = () => {};

    componentDidMount() {
        const token = this.props.match.params.token;

        socket = io(`${socketUrl}?token=${token}`);

        socket.on("event", (eventData) => {
            const amount = eventData["amount"];
            this.updateProgress(amount);
        });

        //Refresh the page when receiving this event type.
        socket.on("refresh", (eventData) => {
            const history = createBrowserHistory();
            history.go(0);
        });

        //Needs to be based on props in future.
        fetch(`${url}/api/goal/matchToken/${token}`)
            .then((response) => response.json())
            .then((json) => {
                if (json["success"] != null) return;

                //Set up component level state.
                this.setState({ ...this.state, channel: json["channel"] });
                this.setState({ ...this.state, progress: json["progress"] });
                this.setState({ ...this.state, goal: json["goal"] });
                this.setState({ ...this.state, goalName: json["name"] });
                this.setState({ ...this.state, colors: json["colors"] });

                fetch(`${url}/api/goal/openSocket/${json["channel"]}`);
            });
    }

    render() {
        const progress = this.state.progress;
        const goal = this.state.goal;
        const goalName = this.state.goalName;
        const formatToDollars = this.state.formatToDollars;
        const colors = this.state.colors;

        if (this.state.animatedBar === false) {
            setTimeout(() => {
                this.setState({ ...this.state, animatedBar: true });
            }, 500);
        }

        const duration = 1000;
        const firstLayerDefault = {
            "background-color": colors["layerOneColor"],
            transition: `width ${duration}ms`,
            width: "0%",
        };
        const secondLayerDefault = {
            "background-color": colors["layerTwoColor"],
            transition: `width ${duration}ms`,
            width: "0%",
        };
        const thirdLayerDefault = {
            "background-color": colors["layerThreeColor"],
            transition: `width ${duration}ms`,
            width: "0%",
        };

        const firstStyles = {
            entering: { width: "0%" },
            entered: { width: `${this.limitWidth((progress / goal) * 100)}%` },
            exiting: { width: `0%` },
            exited: { width: "0%" },
        };

        const secondStyles = {
            entering: { width: "0%" },
            entered: {
                width: `${this.limitWidth((progress / goal) * 100 - 100)}%`,
            },
            exiting: {
                width: `0%`,
            },
            exited: { width: "0%" },
        };

        const thirdStyles = {
            entering: { width: "0%" },
            entered: {
                width: `${this.limitWidth((progress / goal) * 100 - 200)}%`,
            },
            exiting: {
                width: `0%`,
            },
            exited: { width: "0%" },
        };

        if (goalName === "") {
            return <></>;
        }
        return (
            <div
                id="progressBar"
                style={{ "background-color": colors["backgroundColor"] }}
            >
                <Transition in={this.state.animatedBar} timeout={0}>
                    {(state) => (
                        <div
                            id="one"
                            style={{
                                ...firstLayerDefault,
                                ...firstStyles[state],
                            }}
                        ></div>
                    )}
                </Transition>

                <Transition in={this.state.animatedBar} timeout={1000}>
                    {(state) => (
                        <div
                            id="two"
                            style={{
                                ...secondLayerDefault,
                                ...secondStyles[state],
                            }}
                        ></div>
                    )}
                </Transition>

                <Transition in={this.state.animatedBar} timeout={2000}>
                    {(state) => (
                        <div
                            id="three"
                            style={{
                                ...thirdLayerDefault,
                                ...thirdStyles[state],
                            }}
                        ></div>
                    )}
                </Transition>

                <div id="barTitle">
                    <span id="goalName" style={{ color: colors["textColor"] }}>
                        {goalName}
                    </span>
                </div>

                <div id="barInfo">
                    <span id="current" style={{ color: colors["textColor"] }}>
                        {formatToDollars(progress)}
                    </span>
                    <span id="goal" style={{ color: colors["textColor"] }}>
                        {formatToDollars(goal)}
                    </span>
                </div>
            </div>
        );
    }
}

export default GoalBar;
