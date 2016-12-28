import Vue from 'vue';
import ServerConnection from './ServerConnection';
import UserList from './UserList';

const chat = new Vue({
	el: '#app',
	
	data: {
		me: null,
		users: new UserList,
		connection: null,
		chatHistory: [],
		inputText: ''
	},

	created()
	{
		this.connection = new ServerConnection();
		this.connection.onReceive(this.onReceive.bind(this));
	},

	methods: {

		addMsgToHistory(message, type)
		{
			const chat = document.querySelector('.message-history');
			let lastMsgPos
			if (chat.children.length > 0) {
				lastMsgPos = chat.children[chat.children.length-1].offsetTop;
			} else {
				lastMsgPos = 0;
			}
			this.chatHistory.push({message, type});
			setTimeout(_ => {chat.scrollTop = lastMsgPos + 100}, 10);
		},

		sendText()
		{
			this.connection.send('CHAT_MESSAGE_BROADCAST', {text: this.inputText});
			this.addMsgToHistory({text: this.inputText}, 'me');
			this.inputText = '';
		},

		changeAlias()
		{
			this.me.alias = prompt('Others will see you as:', this.me.displayName);
			this.users.update(this.me);
			this.connection.send('CLIENT_SET_ALIAS', this.users.get(this.me));
		},

		onReceive(type, payload)
		{
			console.log(type, payload)
			switch(type)
			{
				case 'CHAT_MESSAGE_BROADCAST':
					this.addMsgToHistory({'text': payload.text, 'user': this.users.get(payload.sender)}, 'user');
					break;
				case 'USER_JOIN':
					this.users.store(payload.user);
					this.addMsgToHistory({text: `${this.users.get(payload.user).displayName} has joined`}, 'server');
					break;
				case 'USER_LEAVE':
					this.addMsgToHistory({text: `${this.users.get(payload.user).displayName} has left`}, 'server');
					this.users.delete(payload.user);
					break;
				case 'USER_UPDATE':
					const oldName = this.users.get(payload.user).displayName;
					this.users.update(payload.user);
					const newName = this.users.get(payload.user).displayName;
					this.addMsgToHistory({text: `${oldName} changed his/her name to ${newName}`}, 'server');
					break;
				case 'WELCOME':
					this.users.store(payload.user);
					this.me = this.users.get(payload.user);
					break;
				default:
					console.error('Unknown action:', type);
			}
		}
	}
});