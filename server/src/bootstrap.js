const WebSocketServer = require('ws').Server;

import ChatParticipant from './ChatParticipant';
import ChatRoom from './ChatRoom';

const server = new WebSocketServer({port: 8080});
const chatRoom = new ChatRoom();

server.on('connection', function(connection) {
	chatRoom.register(new ChatParticipant(connection));
});
