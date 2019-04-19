//Stores the progress variable locally in the browser.
if (typeof(Storage) !== "undefined") {
    if (reset_progress == true) {
	console.log("resetting progress");
	localStorage.setItem("progress", starting_value);
    }
}
else {
    console.log("Browser does not support Web Storage");
}


//formats the goal and progress to two decimal places to show cents.
function formatNumber (number) {
    return number.toFixed(2);
}


//Animates the bars to the correct width of the container.
function fillBar(percent) {
    $("#one").animate({width: (percent + "%")}, function () {
	$("#two").animate({width: ((percent - 100) + "%")}, function () {
	    $("#three").animate({width: ((percent - 200) + "%")});
	});
    });
}


//Calculates the value of the sub event in dollars based on the user's sub_value.
function calcSubs(sub_plan) {
    if (sub_plan == "1000" || sub_plan == "Prime") {
	progress = progress + sub_value;
    }
    else if (sub_plan == "2000") {
	progress = progress + (sub_value * 2);
    }
    else {
	progress = progress + (sub_value * 5);
    }
}


var progress;

$(document).ready(function () {
    progress = Number(localStorage.getItem("progress"));
    percentage = Math.floor((progress/goal) * 100);
    fillBar(percentage);

    $("#goalName").html(goal_name);
    $("#current").html("$" + formatNumber(progress));
    $("#goal").html("$" + formatNumber(goal));
});


//Connect to socket
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});


//Perform Action on event
streamlabs.on('event', (eventData) => {
    console.log(eventData);

    if (eventData.type === 'donation') {
	//code to handle donation events
	var amount = Number(eventData.message[0].amount);
	progress = progress + amount;
    }
    if (eventData.for === 'twitch_account') {
	switch(eventData.type) {
        case 'subscription':
            //code to handle subscription events
	    sub_plan = eventData.message[0].sub_plan;
	    calcSubs(sub_plan);
	    break;
	case 'resub':
	    //code to handle resub events
	    sub_plan = eventData.message[0].sub_plan;
	    calcSubs(sub_plan);
	    break;
	case 'bits':
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

    //Update bar once progress is calculated.
    percent = Math.floor((progress/goal) * 100);
    $("#current").html("$" + formatNumber(progress));
    localStorage.setItem("progress", progress);
    fillBar(percent);
});
