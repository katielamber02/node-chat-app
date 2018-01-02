var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate message object', () =>{
		var from = 'Smith';
		var text = 'hello world.';
		var msg = generateMessage(from, text);
		expect(msg).toInclude({from,text});
		expect(msg.createdAt).toBeA('number');
	});
});