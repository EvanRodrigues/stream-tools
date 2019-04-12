//Stores the progress variable locally in the browser.
function resetProgress () {
    if (typeof(Storage) !== "undefined") {
	localStorage.setItem("progress", 0.0);
    }
    else {
	console.log("Browser does not support Web Storage");
    }
}


//
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

var progress;

$(document).ready(function () {
    progress = Number(localStorage.getItem("progress"));
    $("#goalName").html(goal_name);
    $("#current").html("$" + formatNumber(progress));
    $("#goal").html("$" + formatNumber(goal));
});


//Connect to socket
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});


//Perform Action on event
streamlabs.on('event', (eventData) => {
    if (eventData.type === 'donation') {
	//code to handle donation events
	var amount = Number(eventData.message[0].amount);
	progress = progress + amount;


	percent = Math.floor((progress/goal) * 100);

	$("#current").html("$" + formatNumber(progress));
	fillBar(percent);

    }
    if (eventData.for === 'twitch_account') {
	switch(eventData.type) {
        case 'subscription':
            //code to handle subscription events
	    console.log(progress);
	    console.log("Subscription!");
	    console.log(eventData.message);
            break;
	case 'resub':
	    console.log("Resub!");
	    console.log(eventData.message);
	    break;
	case 'bits':
	    console.log("bits!");
	    console.log(eventData.message);
	    break;
	default:
            //default case
            console.log("default case");
	    console.log(eventData.message);
	}
    }
});
