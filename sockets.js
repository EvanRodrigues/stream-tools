const https = require("https");
const socketIoClient = require("socket.io-client");
const providerToken =
    process.env.PROVIDER_TOKEN || require("./config/keys").PROVIDER_TOKEN;
const providerUrl =
    process.env.PROVIDER_URL || require("./config/keys").PROVIDER_URL;

//token, socket
let streamLabsSockets = new Map();

//Calculates the value of the sub event in dollars based on the sub_plan.
const calcSubs = (subPlan) => {
    if (subPlan === "1000" || subPlan === "Prime") return 5;
    else if (subPlan === "2000") return 10;
    else return 25;
};

//Event handler for the StreamLabs socket api.
const handleSocketEvent = (providerSocket, eventData, id) => {
    let amount;
    let isRepeat, isTest;

    //Ignore stream labels general info messages.
    if (
        eventData.type === "streamlabels.underlying" ||
        eventData.type === "streamlabels" ||
        eventData.type === "reload.instant"
    ) {
        return;
    }

    //Checks eventData.message being null.
    //Example: streamlabels events
    try {
        isRepeat = eventData.message[0].repeat;
        isTest = eventData.message[0].isTest;
    } catch (Err) {
        return;
    }

    //isTest will be true if you try a test alert on streamlabs.
    //isRepeat won't be null if a streamlabels repeat of an alert happens.
    //Either way, ignore the event.
    if (isTest == true || isRepeat == true) {
        if (isTest == true) console.log("test alert used");
        if (isRepeat == true) console.log("repeat alert used");
        return;
    }

    //If event is not a repeat.
    if (isRepeat == null) {
        if (eventData.type === "donation")
            //code to handle donation events.
            amount = Number(eventData.message[0].amount);

        if (eventData.for === "twitch_account") {
            let subPlan = 0;

            switch (eventData.type) {
                case "subscription":
                    //code to handle subscription events.
                    subPlan = eventData.message[0].sub_plan;
                    amount = calcSubs(subPlan);
                    break;
                case "resub":
                    //code to handle resub events.
                    subPlan = eventData.message[0].sub_plan;
                    amount = calcSubs(subPlan);
                    break;
                case "bits":
                    //code to handle bit events.
                    const bit_amount = Number(eventData.message[0].amount);
                    amount = bit_amount / 100;
                    break;
                default:
                    //handles all other events (follower, host, etc.)
                    break;
            }
        }

        //Handles follows, hosts, etc.
        if (amount == null) return;

        providerSocket.emit("event", { token: id, amount: amount });
    }
};

const isIdInUse = (id) => {
    for (const [key, value] of streamLabsSockets.entries()) {
        if (streamLabsSockets.get(key) == id) return true;
    }

    return false;
};

module.exports.setUpSocket = (id) => {
    if (isIdInUse(id)) {
        //Don't set up duplicate sockets.
        return;
    }

    const socket = socketIoClient.connect(
        `https://sockets.streamlabs.com?token=${id}`
    );

    const providerSocket = socketIoClient.connect(
        `${providerUrl}?provider=${providerToken}`
    );

    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("event", (eventData) => {
        handleSocketEvent(providerSocket, eventData, id);
    });
    socket.on("disconnect", () => console.log("disconnected"));

    providerSocket.on("connect", () => {
        console.log("connected to provider!");
    });
    providerSocket.on("test_connection", (eventData) => {
        //GET REQUEST TO SERVER
        if (process.env.NODE_ENV === "production") {
            console.log("PINGING SERVER!");
            https.get(`https://stream-goal.herokuapp.com/api/goal/PING`);
        }
    });
    providerSocket.on("disconnect", () => {
        console.log("disconnected from provider!");
    });

    streamLabsSockets.set(socket, id);
};
