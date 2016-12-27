export default class ChatRoom {

	constructor() 
	{
		this.participants = new Set();
	}

	register(participant)
	{
		this.participants.add(participant);
		participant.setChatRoom(this);
		console.log(`Participant ${ participant.getSessionHash() } joined the main chatroom`)
	}

	send(message, from, to)
	{
		if (to) 
		{
			// message to single participant
			to.receive(message, from);

		} else 
		{
			// broadcast to all participants except self
			for (participant in this.participants) 
			{
				if (participant !== from)
				{
					participant.receive(message, from);
				}
			}
		}
	}

	getParticipantBySessionId(sessionId)
	{
		for (participant in this.participants)
		{
			if (participant.getSessionId() === sessionId) return participant
		}
	}
}