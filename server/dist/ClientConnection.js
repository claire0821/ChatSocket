'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SessionHashGenerator = require('./SessionHashGenerator');

var _SessionHashGenerator2 = _interopRequireDefault(_SessionHashGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientConnection = function () {
	function ClientConnection(connection) {
		_classCallCheck(this, ClientConnection);

		this.connection = connection;
		this.sessionHash = new _SessionHashGenerator2.default().generateHash();
	}

	_createClass(ClientConnection, [{
		key: 'sendPackage',
		value: function sendPackage(type, payload) {
			this.connection.send(JSON.stringify({ type: type, payload: payload }));
		}
	}, {
		key: 'onReceivePackage',
		value: function onReceivePackage(handler) {
			this.connection.on('message', function (dataPackage) {
				var _JSON$parse = JSON.parse(dataPackage),
				    type = _JSON$parse.type,
				    payload = _JSON$parse.payload;

				handler(type, payload);
			});
		}
	}]);

	return ClientConnection;
}();

exports.default = ClientConnection;