"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatRoom = function () {
	function ChatRoom() {
		_classCallCheck(this, ChatRoom);

		this.participants = new Set();
	}

	_createClass(ChatRoom, [{
		key: "register",
		value: function register(participant) {
			this.participants.add(participant);
			participant.setChatRoom(this);
			console.log("Participant " + participant.getSessionHash() + " joined the main chatroom");
		}
	}, {
		key: "send",
		value: function send(message, from, to) {
			if (to) {
				// message to single participant
				to.receive(message, from);
			} else {
				// broadcast to all participants except self
				for (participant in this.participants) {
					if (participant !== from) {
						participant.receive(message, from);
					}
				}
			}
		}
	}, {
		key: "getParticipantBySessionId",
		value: function getParticipantBySessionId(sessionId) {
			for (participant in this.participants) {
				if (participant.getSessionId() === sessionId) return participant;
			}
		}
	}]);

	return ChatRoom;
}();

exports.default = ChatRoom;