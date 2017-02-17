'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function () {
  function Bot(options) {
    _classCallCheck(this, Bot);

    this.token = options.token;
    this.client = new _discord2.default.Client();
  }

  _createClass(Bot, [{
    key: 'connect',
    value: function connect() {
      _winston2.default.debug('Connecting to Discord');
      this.client.login(this.token);
      this.attachListeners();
    }
  }, {
    key: 'attachListeners',
    value: function attachListeners() {
      this.client.on('ready', function () {
        _winston2.default.info('Connected to Discord');
      });

      // TODO: this doesn't trigger when a message is edited
      this.client.on('message', function (message) {});

      this.client.on('error', function (error) {
        _winston2.default.error('Received error event from Discord', error);
      });

      this.client.on('warn', function (warning) {
        _winston2.default.warn('Received warn event from Discord', warning);
      });
    }
  }, {
    key: 'parseMessage',
    value: function parseMessage() {
      var author = message.author;

      // Ignore messages sent by the bot itself
      if (author.id === this.client.user.id) {
        return;
      }

      // Parse command and arguments
      if (message.content.startsWith('.')) {
        var content = message.content.toLowerCase();
        var args = content.trim().split(/\s+/);
        var command = args.shift().substr(1);

        if (!command.length) {
          return;
        }

        // message.reply('pong');
        message.channel.sendMessage(['```', 'The command was \'' + command + '\' with the arugments: ' + args.join(', '), '```'].join(''));
      }
    }
  }]);

  return Bot;
}();

exports.default = Bot;