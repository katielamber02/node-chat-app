var socket = io();

function scrollToBottom(){
	var messages = $("#messages");
	var newMessage = messages.children("li:last-child");
	// Height
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
};

socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('newMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $("#message-template").html();
	var html = Mustache.render(template,{
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});
	$("#messages").append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $("#location-message-template").html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	$("#messages").append(html);
	scrollToBottom();
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



















