const io = require("socket.io-client");

const openSockets = {};

//Event handler for the StreamLabs socket api.
handleSocketEvent = (eventData) => {
    let amount;
    let isRepeat;

    console.log(eventData);

    //Ignore stream labels general info messages.
    if (
        eventData.type === "streamlabels.underlying" ||
        eventData.type === "streamlabels" ||
        eventData.type === "reload.instant"
    ) {
        return;
    }

    //TODO: Check eventData.message being null.
    try {
        isRepeat = !("repeat" in eventData.message[0]);
    } catch (Err) {}

    //If event is not a repeat.
    if (!!("repeat" in eventData.message[0])) {
        if (eventData.type === "donation") {
            //code to handle donation events.
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
                    //code to handle subscription events.
                    subPlan = eventData.message[0].sub_plan;
                    this.calcSubs(subPlan);
                    break;
                case "resub":
                    //code to handle resub events.
                    subPlan = eventData.message[0].sub_plan;
                    this.calcSubs(subPlan);
                    break;
                case "bits":
                    //code to handle bit events.
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

module.exports.setUpSocket = (id) => {
    const socket = io.connect(`https://sockets.streamlabs.com?token=${id}`);

    console.log(id);

    if (openSockets[id] != null) {
        return;
    }

    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("event", (eventData) => {
        handleSocketEvent(eventData);
    });

    socket.on("disconnect", () => {});

    openSockets[id] = socket;
};
