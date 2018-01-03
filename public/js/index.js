var socket = io();

socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('newMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $("<li></li>");
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	$("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = $("<li></li>");
	var a = $("<a target='_blank'>My current location</a>");
	
	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href',message.url);
	li.append(a);
	$("#messages").append(li);
});

socket.on('disconnect', function(){
	console.log('disconnect from server');
});

$('#message-form').on("submit", function(e){
	e.preventDefault();

	var messageBox = $("[name='message']");

	socket.emit('createMessage',{
		from: 'User',
		text: messageBox.val()
	}, function(){
		messageBox.val('');
	});
});

var sendLocation = $("#sendLocation");
sendLocation.on('click', function(){
	if(!navigator.geolocation){
		return alert('This is not supported by the Browser.');
	}

	sendLocation.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position){
		sendLocation.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		sendLocation.removeAttr('disabled').text('Send location');
		alert('Unable to fetch Location.');
	});
});



















