import ClientConnection from './ClientConnection';
import {actionTypes} from './consts';

export default class ChatParticipant {

	constructor(connection)
	{
		this.chatRoom = null;
		this.clientConnection = new ClientConnection(connection);
		this.clientConnection.onReceivePackage(function(type, payload) {
			this.send({type, payload});
		});
	}

	send(message, to)
	{
		this.chatRoom.send(message, this, to);
	}

	receive(message, from)
	{
		this.clientConnection.sendPackage(message);
	}

	getSessionHash()
	{
		return this.clientConnection.sessionHash
	}

	setChatMediator(chatRoom)
	{
		this.chatRoom = chatRoom;
	}
}