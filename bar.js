//Connect to socket
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});

//Perform Action on event
streamlabs.on('event', (eventData) => {
    console.log(eventData);

    if (!eventData.for && eventData.type === 'donation') {
	//code to handle donation events
	console.log(eventData.message);
    }
    if (eventData.for === 'twitch_account') {
	switch(eventData.type) {
        case 'follow':
            //code to handle follow events
            console.log(eventData.message);
            break;
        case 'subscription':
            //code to handle subscription events
            console.log(eventData.message);
            break;
        default:
            //default case
            console.log(eventData.message);
	}
    }
});
