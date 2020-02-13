import { response } from "express";

let progress; //Var that keeps track of progress on the front-end.
let streamlabs; //Streamlabs socket connection.
let sub_val; //Used to calculate subscription value
let twitch_channel; //Used to determine which goal object from the DB to use.

//Formats the goal and progress to two decimal places to show cents.
function formatNumber(number) {
    return number.toFixed(2);
}

//Ajax request to update data.json
function UpdateProgress(progress) {
    const json = { "progress": formatNumber(progress) };
    const url = window.location.href;

    $.ajax({
        type: "POST",
        url: url + "api/goal/updateProgress/" + twitch_channel,
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { },
        failure: function (err) { console.log(err) }
    });
}

//Gets the channel name from the backend.
//The channel is set with an environment variable.
async function getChannel() {
    const url = window.location.href + "api/goal/channel";

    const response = await fetch(url);
    const json = await response.json();
    const channel = json["channel"];

    return channel;
}


//Gets data from backend.
async function getData(twitch_channel) {
    const api_url = window.location.href + "api/goal/channel/" + twitch_channel;

    const response = await fetch(api_url, { mode: 'no-cors' });
    const json = await response.json();

    const progress = json["progress"];
    const goal = json["goal"];
    const name = json["name"];
    const sub_val = json["sub_val"];

    const output = { "progress": progress, "goal": goal, "name": name, "sub_val": sub_val };
    return output;
}

//Animates the bars to the correct width of the container.
function fillBar(percent) {
    $("#one").animate({ width: percent + "%" }, function () {
        $("#two").animate({ width: percent - 100 + "%" }, function () {
            $("#three").animate({ width: percent - 200 + "%" });
        });
    });
}

//Calculates the value of the sub event in dollars based on the user's sub_value.
function calcSubs(sub_plan) {
    if (sub_plan == "1000" || sub_plan == "Prime") {
        progress = progress + sub_val;
    } else if (sub_plan == "2000") {
        progress = progress + sub_val * 2;
    } else {
        progress = progress + sub_val * 5;
    }
}

//Get data asynchronously when page loads.
$(document).ready(async function () {
    try { //Dev
        twitch_channel = channel;
    }
    catch (err) { //Live
        twitch_channel = await getChannel();
    }

    const data = await getData(twitch_channel);
    progress = data["progress"];
    name = data["name"];
    goal = data["goal"];
    sub_val = data["sub_val"];

    percentage = Math.floor((progress / goal) * 100);
    fillBar(percentage);

    $("#goalName").html(name);
    $("#current").html("$" + formatNumber(progress));
    $("#goal").html("$" + formatNumber(goal));
});

//Connect to socket.
try { //Dev 
    streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {
        transports: ["websocket"]
    });

    startSocket(streamlabs);
}
catch (err) { //live
    const url = window.location.href;

    fetch(url + 'api/goal/accessToken')
        .then(response => {
            return response.json();
        })
        .then(json => {
            const api_token = json["token"];
            streamlabs = io(`https://sockets.streamlabs.com?token=${api_token}`, {
                transports: ["websocket"]
            });

            startSocket(streamlabs);
        });
}

//Perform Action on event
function startSocket(streamlabs) {
    streamlabs.on("event", eventData => {
        console.log(eventData);

        //Ignore stream labels general info messages
        if (eventData.type == "streamlabels.underlying" || eventData.type == "streamlabels" || eventData.type == "reload.instant") {
            return;
        }

        //If event is not a repeat
        if (("repeat" in eventData.message[0])) {
            if (eventData.type === "donation") {
                //code to handle donation events
                var amount = Number(eventData.message[0].amount);
                progress = progress + amount;
            }
            if (eventData.for === "twitch_account") {
                switch (eventData.type) {
                    case "subscription":
                        //code to handle subscription events
                        sub_plan = eventData.message[0].sub_plan;
                        calcSubs(sub_plan);
                        break;
                    case "resub":
                        //code to handle resub events
                        sub_plan = eventData.message[0].sub_plan;
                        calcSubs(sub_plan);
                        break;
                    case "bits":
                        //code to handle bit events
                        var bit_amount = Number(eventData.message[0].amount);
                        var amount = bit_amount / 100;
                        progress = progress + amount;
                        break;
                    default:
                        //handles all other events (follower, host, etc.)
                        break;
                }
            }
            UpdateProgress(progress);
        }

        //Update bar once progress is calculated.
        percent = Math.floor((progress / goal) * 100);
        $("#current").html("$" + formatNumber(progress));
        fillBar(percent);
    });
}
