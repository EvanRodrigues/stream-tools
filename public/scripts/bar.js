//Gets data from txt file
async function getData() {
    const response = await fetch("../data/data.json", { mode: 'no-cors' });
    const json = await response.json();

    //const data_fields = response_text.split("\r\n");
    const progress = json["progress"];
    const goal = json["goal"];
    const name = json["name"];

    const output = { "progress": progress, "goal": goal, "name": name }
    return output;
}

//formats the goal and progress to two decimal places to show cents.
function formatNumber(number) {
    return number.toFixed(2);
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
        progress = progress + sub_value;
    } else if (sub_plan == "2000") {
        progress = progress + sub_value * 2;
    } else {
        progress = progress + sub_value * 5;
    }
}

var progress;

$(document).ready(async function () {
    const data = await getData()
    progress = data["progress"];
    name = data["name"];
    goal = data["goal"];

    percentage = Math.floor((progress / goal) * 100);
    fillBar(percentage);

    $("#goalName").html(name);
    $("#current").html("$" + formatNumber(progress));
    $("#goal").html("$" + formatNumber(goal));
});

//Connect to socket
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {
    transports: ["websocket"]
});

//Perform Action on event
streamlabs.on("event", eventData => {
    console.log(eventData);

    if (!("repeat" in eventData.message[0])) {
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
                    console.log("default case");
                    console.log(eventData.message);
            }
        }
    }

    //Update bar once progress is calculated.
    percent = Math.floor((progress / goal) * 100);
    $("#current").html("$" + formatNumber(progress));
    localStorage.setItem("progress", progress);
    fillBar(percent);
});
