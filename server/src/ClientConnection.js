import SessionHashGenerator from './SessionHashGenerator';

export default class ClientConnection {

	constructor(connection)
	{
		this.connection = connection;
		this.sessionHash = new SessionHashGenerator.generateHash;
	}

	sendPackage(type, payload)
	{
		this.connection.send(JSON.stringify({type, payload}));
	}

	onReceivePackage(handler) {
		this.connection.on('message', function(dataPackage) {
			const {type, payload} = JSON.parse(dataPackage);
			handler(type, payload);
		});
	}

}