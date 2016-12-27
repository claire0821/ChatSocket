import SessionHashGenerator from './SessionHashGenerator';

export default class ClientConnection {

	constructor(connection)
	{
		this.connection = connection;
		this.sessionHash = new SessionHashGenerator().generateHash();
	}

	sendPackage(type, payload)
	{
		const msg = JSON.stringify({type, payload});
		console.log('sending message to ', this.sessionHash, msg);
		this.connection.send(msg);
	}

	onDisconnect(handler)
	{
		this.connection.on('close', handler);
	}

	onReceivePackage(handler) {
		this.connection.on('message', function(dataPackage) {
			const {type, payload} = JSON.parse(dataPackage);
			handler(type, payload);
		});
	}

}