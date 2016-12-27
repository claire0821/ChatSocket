'use strict';

var _ChatParticipant = require('./ChatParticipant');

var _ChatParticipant2 = _interopRequireDefault(_ChatParticipant);

var _ChatRoom = require('./ChatRoom');

var _ChatRoom2 = _interopRequireDefault(_ChatRoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebSocketServer = require('ws').Server;

var server = new WebSocketServer({ port: 8080 });
var chatRoom = new _ChatRoom2.default();

server.on('connection', function (connection) {
	chatRoom.register(new _ChatParticipant2.default(connection));
});