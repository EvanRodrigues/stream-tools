import React, { Component } from "react";
import "../stylesheets/css/bar.css";
import { socketToken } from "../config/ConnectionVars";

class GoalBar extends Component {
    constructor() {
        super();
        this.state = {
            progress: 0,
            goal: 0,
            goalName: "",
            //Formats the goal and progress to two decimal places to show cents.
            formatToDollars: function (number) {
                return `$${number.toFixed(2)}`;
            },
        };
    }

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

        if (goalName === "") {
            return <></>;
        }
        return (
            <div id="progressBar">
                <div id="one"></div>
                <div id="two"></div>
                <div id="three"></div>

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
