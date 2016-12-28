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
	}

	leave(participant)
	{
		this.participants.delete(participant);
	}

	send(message, from, to)
	{
		if (from) message.payload.sender = from.getUserInfo()
		if (to) 
		{
			// message to single participant
			to.receive(message);

		} else {
			// broadcast to all participants except self
			this.participants.forEach(participant => {
				if (participant != from) participant.receive(message)
			})
		}
	}

	index()
	{
		return Array
			.from(this.participants)
			.map(participant => participant.getUserInfo());
	}
}