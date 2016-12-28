import ClientConnection from './ClientConnection';
import {actionTypes} from './consts';

export default class ChatParticipant {

	constructor(connection)
	{
		this.chatRoom = null;
		this.alias = null;
		this.clientConnection = new ClientConnection(connection);
		this.clientConnection.onReceivePackage((
			function(type, payload) {
				this.send({type, payload});
			}
		).bind(this));
		this.clientConnection.onDisconnect((
			function() {
				this.chatRoom.send({type: actionTypes.USER_LEAVE, payload: {user: this.getUserInfo()} }, this);
				this.chatRoom.leave(this);
			}
		).bind(this));
	}

	send(message, to)
	{
		switch(message.type) 
		{
			case actionTypes.CLIENT_SET_ALIAS:
				this.alias = message.payload.alias;
				this.chatRoom.send({type: actionTypes.USER_UPDATE, payload: {user: this.getUserInfo()} }, this);
				break;
			default:
				this.chatRoom.send(message, this, to);
				break;
		}
	}

	receive(message)
	{
		this.clientConnection.sendPackage(message.type, message.payload);
	}

	getUserInfo()
	{
		return {
			"hash": this.clientConnection.sessionHash,
			"alias": this.alias
		}
	}

	getSessionHash()
	{
		return this.clientConnection.sessionHash
	}

	setChatRoom(chatRoom)
	{
		this.chatRoom = chatRoom;
		// notify other users that I joined
		this.chatRoom.send({type: actionTypes.USER_JOIN, payload: {user: this.getUserInfo()} }, this);
		// send my client my session info
		this.chatRoom.send({type: actionTypes.WELCOME, payload: {
			user: this.getUserInfo(),
			users: this.chatRoom.index()
		} }, null, this);
	}
}