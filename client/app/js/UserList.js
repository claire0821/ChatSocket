export default class UserList {

	constructor()
	{
		this.users = {};
		this.genericUser = {
			'hash': '0123456789',
			'alias': null,
			'displayName': 'Unknown'
		}

		this.count = 0;
	}

	index()
	{
		let userArray = [];
		for (let hash in this.users) {
			if (this.users[hash]) userArray.push(this.users[hash]);
		}
		return userArray;
	}

	store(user)
	{
		user.displayName = (user.alias) ? user.alias : user.hash;
		this.users[user.hash] = user;
		this.count++;
	}

	get(user)
	{
		if (user) {
			if (this.users[user.hash]) {
				return this.users[user.hash];
			}
			return this.genericUser;
		}
		return this.genericUser;
	}

	delete(user)
	{
		this.users[user.hash] = null;
		this.count--;
	}

	update(user)
	{
		user.displayName = (user.alias) ? user.alias : user.hash;
		this.users[user.hash] = user;
	}
}