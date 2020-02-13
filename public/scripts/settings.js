
async function getGoal(twitch_channel, url) {
    const api_url = url + "/api/goal/channel/" + twitch_channel;
    const response = await fetch(api_url);
    const json = await response.json();

    $("#progress").val(json["progress"]);
    $("#goal_target").val(json["goal"]);
    $("#goal_name").val(json["name"]);
    $("#sub_val").val(json["sub_val"]);
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
});
