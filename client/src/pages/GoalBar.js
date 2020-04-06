import React, { Component } from "react";
import { Transition } from "react-transition-group";
import "../stylesheets/css/bar.css";

let socketToken;

/*
 * Update this to always fetch token from db.
 */
try {
    //dev
    socketToken = require("../config/ConnectionVars").socketToken;
} catch (err) {
    //live
    //fetch token from db
    socketToken = "hello";
}

class GoalBar extends Component {
    constructor() {
        super();
        this.state = {
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

    limitWidth = (width) => {
        return width > 100 ? 100 : width;
    };

    //Calculates the value of the sub event in dollars based on the sub_plan.
    calcSubs = (subPlan) => {
        let currentProgress = this.state.progress;

        if (subPlan === "1000" || subPlan === "Prime") {
            currentProgress += 5;
        } else if (subPlan === "2000") {
            currentProgress += 10;
        } else {
            currentProgress += 25;
        }

        this.setState({ ...this.state, progress: currentProgress });
    };

    //Ajax request to update data.json
    updateProgress = (progress) => {
        fetch(`http://localhost:5000/api/goal/updateProgress/doopian`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ progress: progress }),
        });
    };

    handleSocketEvent = (eventData) => {
        let amount;

        //Ignore stream labels general info messages
        if (
            eventData.type === "streamlabels.underlying" ||
            eventData.type === "streamlabels" ||
            eventData.type === "reload.instant"
        ) {
            return;
        }

        //If event is not a repeat
        if ("repeat" in eventData.message[0]) {
            if (eventData.type === "donation") {
                //code to handle donation events
                amount = Number(eventData.message[0].amount);
                this.setState({
                    ...this.state,
                    progress: this.state.progress + amount,
                });
            }
            if (eventData.for === "twitch_account") {
                let subPlan = 0;

                switch (eventData.type) {
                    case "subscription":
                        //code to handle subscription events
                        subPlan = eventData.message[0].sub_plan;
                        this.calcSubs(subPlan);
                        break;
                    case "resub":
                        //code to handle resub events
                        subPlan = eventData.message[0].sub_plan;
                        this.calcSubs(subPlan);
                        break;
                    case "bits":
                        //code to handle bit events
                        const bit_amount = Number(eventData.message[0].amount);
                        amount = bit_amount / 100;
                        this.setState({
                            ...this.state,
                            progress: this.state.progress + amount,
                        });
                        break;
                    default:
                        //handles all other events (follower, host, etc.)
                        break;
                }
            }
            this.updateProgress(this.state.progress);
        }
    };

    componentDidMount() {
        const io = require("socket.io-client");

        const socket = io(
            `https://sockets.streamlabs.com?token=${socketToken}`
        );

        socket.on("event", (eventData) => {
            console.log(eventData);
            this.handleSocketEvent(eventData);
        });

        fetch(`http://localhost:5000/api/goal`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ ...this.state, progress: json[0]["progress"] });
                this.setState({ ...this.state, goal: json[0]["goal"] });
                this.setState({ ...this.state, goalName: json[0]["name"] });
            });
    }

    render() {
        const progress = this.state.progress;
        const goal = this.state.goal;
        const goalName = this.state.goalName;
        const formatToDollars = this.state.formatToDollars;

        if (this.state.animatedBar === false) {
            setTimeout(
                () => this.setState({ ...this.state, animatedBar: true }),
                500
            );
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
