'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ClientConnection = require('./ClientConnection');

var _ClientConnection2 = _interopRequireDefault(_ClientConnection);

var _consts = require('./consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatParticipant = function () {
	function ChatParticipant(connection) {
		_classCallCheck(this, ChatParticipant);

		this.chatRoom = null;
		this.clientConnection = new _ClientConnection2.default(connection);
		this.clientConnection.onReceivePackage(function (type, payload) {
			this.send({ type: type, payload: payload });
		});
	}

	_createClass(ChatParticipant, [{
		key: 'send',
		value: function send(message, to) {
			this.chatRoom.send(message, this, to);
		}
	}, {
		key: 'receive',
		value: function receive(message, from) {
			this.clientConnection.sendPackage(message);
		}
	}, {
		key: 'getSessionHash',
		value: function getSessionHash() {
			return this.clientConnection.sessionHash;
		}
	}, {
		key: 'setChatRoom',
		value: function setChatRoom(chatRoom) {
			this.chatRoom = chatRoom;
		}
	}]);

	return ChatParticipant;
}();

exports.default = ChatParticipant;