var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate message object', () =>{
		var from = 'Smith';
		var text = 'hello world.';
		var msg = generateMessage(from, text);
		expect(msg).toInclude({from,text});
		expect(msg.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate location object', () => {
		var from = 'Smith';
		var latitude = 1;
		var longitude = 1;
		var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
		var msg = generateLocationMessage(from, latitude, longitude);
		expect(msg).toInclude({from,url});
		expect(msg.createdAt).toBeA('number');
	});
});