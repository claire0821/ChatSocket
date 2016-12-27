import {actionTypes} from './consts';

export default class ChatRoom {

	constructor() 
	{
		this.participants = new Set();
	}

	register(participant)
	{
		this.participants.add(participant);
		participant.setChatRoom(this);
		this.send({
			type: actionTypes.SERVER_MESSAGE,
			payload: `Participant ${ participant.getSessionHash() } has joined`
		}, participant);
		this.send({
			type: actionTypes.UPDATE_USER,
			payload: {sessionHash: participant.getSessionHash()}
		}, participant, participant);
	}

	leave(participant)
	{
		this.participants.delete(participant);
		this.send({
			type: actionTypes.SERVER_MESSAGE,
			payload: `Participant ${ participant.getSessionHash() } has left`
		}, null);
	}

	send(message, from, to)
	{
		if (to) 
		{
			// message to single participant
			to.receive(message, from);

		} else {
			// broadcast to all participants except self
			this.participants.forEach(participant => {
				if (participant != from) participant.receive(message, from)
			})
		}
	}
}