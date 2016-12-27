window.onload = function() {
	const conn = new WebSocket(`ws://${location.hostname}:8080`);

	conn.addEventListener('open', function() {

	});

	const textBox = document.querySelector('.input-text');

	const sendMessage = function() {
		const message = textBox.value;
		conn.send(JSON.stringify({
			type: 'CHAT_MESSAGE_BROADCAST',
			payload: message
		}))
		textBox.value = '';
	} 

	document.querySelector('.input-send').onclick = _ => sendMessage();
	document.querySelector('.input-text').onkeydown = e => {
		if (e.key === 'Enter') sendMessage(); 
	};

	conn.addEventListener('message', function(event) {
		console.log('Received message: ', JSON.parse(event.data));
		const serverMessage = JSON.parse(event.data);

		switch(serverMessage.type) {

			case 'UPDATE_USER':
				document.querySelector('#username').innerText = `Other users see you as ${serverMessage.payload.sessionHash}`
				break;
		}
	});
}