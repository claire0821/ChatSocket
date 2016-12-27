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

		addMsgToHistory(message, type, from)
		{
			this.chatHistory.push({message, type, from});
		},

		sendText()
		{
			this.connection.send('CHAT_MESSAGE_BROADCAST', this.inputText);
			this.addMsgToHistory(this.inputText, 'me')
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

// window.onload = function() {
// 	const conn = new WebSocket(`ws://${location.hostname}:8080`);

// 	conn.addEventListener('open', function() {

// 	});

// 	const textBox = document.querySelector('.input-text');

// 	const sendMessage = function() {
// 		const message = textBox.value;
// 		conn.send(JSON.stringify({
// 			type: 'CHAT_MESSAGE_BROADCAST',
// 			payload: message
// 		}))
// 		textBox.value = '';
// 	} 

// 	document.querySelector('.input-send').onclick = _ => sendMessage();
// 	document.querySelector('.input-text').onkeydown = e => {
// 		if (e.key === 'Enter') sendMessage(); 
// 	};

// 	conn.addEventListener('message', function(event) {
// 		console.log('Received message: ', JSON.parse(event.data));
// 		const serverMessage = JSON.parse(event.data);

// 		switch(serverMessage.type) {

// 			case 'UPDATE_USER':
// 				document.querySelector('#username').innerText = `Other users see you as ${serverMessage.payload.sessionHash}`
// 				break;
// 		}
// 	});
// }