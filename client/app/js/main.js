import Vue from 'vue';
import ServerConnection from './ServerConnection';

const chat = new Vue({
	el: '#app',
	
	data: {
		session: null,
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
			let renderAlias = false, renderHash = false
			if (message.sender) {
				renderHash = true;
				if (message.sender.alias) {
					renderHash = false;
					renderAlias = true;
				}
			}
			this.chatHistory.push({message, type, renderHash, renderAlias});
		},

		sendText()
		{
			this.connection.send('CHAT_MESSAGE_BROADCAST', {text: this.inputText});
			this.addMsgToHistory({text: this.inputText}, 'me')
			this.inputText = '';
		},

		onReceive(type, payload)
		{
			// chat messages
			if (type === 'CHAT_MESSAGE_BROADCAST' || 
				type === 'CHAT_MESSAGE_WHISPER') {
				this.addMsgToHistory(payload, 'user');
			}

			// server messages
			if (type === 'SERVER_MESSAGE') {
				this.addMsgToHistory(payload, 'server');
			}

			// user info changed
			if (type === 'UPDATE_USER') {
				this.session = payload.sessionHash;
			}
		}
	}
});