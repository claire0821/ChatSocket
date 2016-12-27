import ClientConnection from './ClientConnection';
import {actionTypes} from './consts';

export default class ChatParticipant {

	constructor(connection)
	{
		this.chatRoom = null;
		this.clientConnection = new ClientConnection(connection);
		this.clientConnection.onReceivePackage((
			function(type, payload) {
				this.send({type, payload});
			}
		).bind(this));
		this.clientConnection.onDisconnect((
			function() {
				this.chatRoom.leave(this);
			}
		).bind(this));
	}

	send(message, to)
	{
		this.chatRoom.send(message, this, to);
	}

	receive(message, from)
	{
		this.clientConnection.sendPackage(message.type, message.payload);
	}

	getSessionHash()
	{
		return this.clientConnection.sessionHash
	}

	setChatRoom(chatRoom)
	{
		this.chatRoom = chatRoom;
	}
}