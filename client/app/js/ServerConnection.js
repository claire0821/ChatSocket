export default class ServerConnection {

	constructor()
	{
		this.connection = new WebSocket(`ws://${location.hostname}:8080`)
	}

	onReceive(handler)
	{
		this.connection.addEventListener('message', event => {
			const {type, payload} = JSON.parse(event.data);
			handler(type, payload);
		});
	}

	send(type, payload)
	{
		this.connection.send(JSON.stringify({type, payload}));
	}

}