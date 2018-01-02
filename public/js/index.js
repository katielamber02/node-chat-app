var socket = io();

socket.on('connect', function(){
	console.log('connected to server');

	socket.emit('createMessage', {
		from: 'doe@example.com',
		text: 'world'
	});
});

socket.on('newMessage', function(message){
	console.log(message);
});

socket.on('disconnect', function(){
	console.log('disconnect from server');
});