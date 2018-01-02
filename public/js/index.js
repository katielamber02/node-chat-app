var socket = io();

socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('newMessage', function(message){
	console.log('newMessage :',message);
	var li = $("<li></li>");
	li.text(`${message.from}: ${message.text}`);

	$("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
	var li = $("<li></li>");
	var a = $("<a target='_blank'>My current location</a>");
	
	li.text(`${message.from}: `);
	a.attr('href',message.url);
	li.append(a);
	$("#messages").append(li);
});

socket.on('disconnect', function(){
	console.log('disconnect from server');
});

$('#message-form').on("submit", function(e){
	e.preventDefault();

	socket.emit('createMessage',{
		from: 'User',
		text: $("[name='message']").val()
	}, function(){

	});
});

var sendLocation = $("#sendLocation");
sendLocation.on('click', function(){
	if(!navigator.geolocation){
		return alert('This is not supported by the Browser.');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		alert('Unable to fetch Location.');
	});
});



















