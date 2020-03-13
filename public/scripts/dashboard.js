function formatNumber(number) {
    return number.toFixed(2);
}

async function updateGoal() {
    const url = window.location.origin;
    let twitch_channel;
    const progress = parseFloat($("#progress").val());
    const goal_target = parseFloat($("#goal_target").val());
    const goal_name = $("#goal_name").val();
    const sub_val = parseFloat($("#sub_val").val());

    try { //Dev
        twitch_channel = channel;
    }
    catch (err) { //Live
        twitch_channel = await getChannel(url);
    }

    const data = {
        "progress": progress,
        "goal": goal_target,
        "name": goal_name,
        "sub_val": sub_val
    };

    $.ajax({
        type: "POST",
        url: url + "/api/goal/update/" + twitch_channel,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => { window.location.href = url; }
    });
};

async function getGoal(twitch_channel, url) {
    const api_url = url + "/api/goal/channel/" + twitch_channel;
    const response = await fetch(api_url);
    const json = await response.json();

    $("#progress").val(json["progress"]);
    $("#goal_target").val(json["goal"]);
    $("#goal_name").val(json["name"]);
    $("#sub_val").val(json["sub_val"]);


    $("#current").html("$" + formatNumber(json["progress"]));
    $("#goalName").html(json["name"]);
    $("#goal").html("$" + formatNumber(json["goal"]));
}

//Gets the channel name from the backend.
//The channel is set with an environment variable.
async function getChannel(url) {
    const api_url = url + "/api/goal/channel";

    const response = await fetch(api_url);
    const json = await response.json();
    const channel = json["channel"];

    return channel;
}

//Get data asynchronously when page loads.
$(document).ready(async function () {
    const url = window.location.origin;

    try { //Dev
        twitch_channel = channel;
    }
    catch (err) { //Live
        twitch_channel = await getChannel(url);
    }

    getGoal(twitch_channel, url);

    $("#barSubmit").click(updateGoal);
});
