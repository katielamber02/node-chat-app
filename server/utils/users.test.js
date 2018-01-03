const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: 'Sai',
			room: 'roomA'
		}, {
			id: 2,
			name: 'Kyaw',
			room: 'roomB'
		}, {
			id: 3,
			name: 'Hla',
			room: 'roomA'
		}];
	});

	it('should add user', () => {
		var users = new Users();
		var user = {
			id: 123,
			name: 'sai',
			room: 'roomA'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove user',() => {
		var user = users.removeUser(2);
		expect(user).toEqual({
			id: 2,
			name: 'Kyaw',
			room: 'roomB'
		});
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		var user = users.removeUser(555);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var user = users.getUser(1);
		expect(user).toEqual({
			id: 1,
			name: 'Sai',
			room: 'roomA'
		});
	});

	it('should not find user', () => {
		var user = users.getUser(555);
		expect(user).toNotExist();
	});

	it('should return names of roomA', () => {
		var resUser = users.getUserList('roomA');
		expect(resUser).toEqual(['Sai', 'Hla']);
	});

	it('should return names of roomB', () => {
		var resUser = users.getUserList('roomB');
		expect(resUser).toEqual(['Kyaw']);
	});
});