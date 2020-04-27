import React, { Component } from "react";
import { Transition } from "react-transition-group";
import io from "socket.io-client";
import "../stylesheets/css/bar.css";

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
    constructor() {
        super();
        this.state = {
            channel: "",
            progress: 0,
            goal: 0,
            goalName: "",
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
        fetch(`${url}/api/goal/updateProgress/${this.state.channel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ progress: progress }),
        });
    };

    componentDidMount() {
        //TODO: Dynamic routes for tokens.
        const token = Math.floor(Math.random() * 2);
        socket = io(`${socketUrl}?token=123`);

        //TODO: Update front end from eventData.
        socket.on("event", (eventData) => {
            console.log(eventData);
        });

        fetch(`${url}/api/goal`)
            .then((response) => response.json())
            .then((json) => {
                //Set up component level state.
                this.setState({ ...this.state, channel: json[0]["channel"] });
                this.setState({ ...this.state, progress: json[0]["progress"] });
                this.setState({ ...this.state, goal: json[0]["goal"] });
                this.setState({ ...this.state, goalName: json[0]["name"] });

                fetch(`${url}/api/goal/openSocket/${json[0]["channel"]}`);
            });
    }

    render() {
        const progress = this.state.progress;
        const goal = this.state.goal;
        const goalName = this.state.goalName;
        const formatToDollars = this.state.formatToDollars;

        if (this.state.animatedBar === false) {
            setTimeout(() => {
                this.setState({ ...this.state, animatedBar: true });
            }, 500);
        }

        const duration = 1000;
        const firstLayerDefault = {
            transition: `width ${duration}ms`,
            width: "0%",
        };
        const secondLayerDefault = {
            transition: `width ${duration}ms`,
            width: "0%",
        };
        const thirdLayerDefault = {
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
            <div id="progressBar">
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
                    <span id="goalName">{goalName}</span>
                </div>

                <div id="barInfo">
                    <span id="current">{formatToDollars(progress)}</span>
                    <span id="goal">{formatToDollars(goal)}</span>
                </div>
            </div>
        );
    }
}

export default GoalBar;
