'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _games2 = require('./games');

var games = _interopRequireWildcard(_games2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function () {
  function Bot(options) {
    _classCallCheck(this, Bot);

    this.token = options.token;
    this.prefix = options.prefix;
    this.discord = new _discord2.default.Client();

    // Initialize game types
    this.games = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(games)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        this.games[key] = new games[key]();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(Bot, [{
    key: 'connect',
    value: function connect() {
      _winston2.default.info('Connecting to Discord');
      this.discord.login(this.token);
      this.attachListeners();
    }
  }, {
    key: 'attachListeners',
    value: function attachListeners() {
      this.discord.on('ready', function () {
        _winston2.default.info('Connected to Discord');
      });

      // TODO: this doesn't trigger when a message is edited
      this.discord.on('message', this.parseMessage.bind(this));

      this.discord.on('error', function (error) {
        _winston2.default.error('Received error event from Discord', error);
      });

      this.discord.on('warn', function (warning) {
        _winston2.default.warn('Received warn event from Discord', warning);
      });
    }
  }, {
    key: 'parseMessage',
    value: function parseMessage(message) {
      // Ignore messages sent by the bot itself
      if (message.author.id === this.discord.user.id) {
        return;
      }

      // Parse command and arguments
      if (message.content.startsWith(this.prefix)) {
        var content = message.content.toLowerCase();
        var args = content.trim().split(/\s+/);
        var command = args.shift().substr(1);

        if (command.length) {
          this.command(command, args, message);
        }
      }
    }
  }, {
    key: 'getGamesFromArgs',
    value: function getGamesFromArgs(args) {
      var _this = this;

      var games = [];
      args.some(function (arg) {
        if (_this.games.hasOwnProperty(arg)) {
          games.push(arg);
        } else {
          return true;
        }
      });
      return games;
    }
  }, {
    key: 'startPicking',
    value: function startPicking(args) {}

    /**
     * Command
     */

  }, {
    key: 'command',
    value: function command(_command, args, message) {
      switch (_command) {
        // Join
        case 'j':
        case 'join':
          {
            this.join(args, message);
            break;
          }

        // Leave
        case 'l':
        case 'leave':
          {
            this.leave(args, message);
            break;
          }

        // List
        case 'ls':
        case 'list':
          {
            this.list(args, message);
            break;
          }

        // Promote
        case 'p':
        case 'promote':
          {
            this.promote(args, message);
            break;
          }
      }
    }

    /**
     * Join command
     */

  }, {
    key: 'join',
    value: function join(args, message) {
      var _this2 = this;

      // Check for games types in arguments
      var games = this.getGamesFromArgs(args);
      if (!games.length) {
        message.channel.sendMessage('Could not find a pug by this name.');
        return false;
      }

      var joined = [];

      games.every(function (type) {
        var game = _this2.games[type];
        var player = game.addPlayer(message.author);

        // console.log(player)

        // The player was not added
        if (!player) {
          message.channel.sendMessage(message.author.username + ' could not be added :(');
          return;
        }

        joined.push(game.name);

        // Did the pug fill?
        if (game.isFull) {
          // this.startPicking();
          return false;
        }
      });

      if (joined.length) {
        message.channel.sendMessage(message.author.username + ' joined **' + joined.join(' ') + '**');
      }
    }

    /**
     * Leave command
     */

  }, {
    key: 'leave',
    value: function leave(args, message) {}

    /**
     * List command
     */

  }, {
    key: 'list',
    value: function list(args, message) {
      var _this3 = this;

      var reply = void 0;

      // Without aruments list all games
      if (args.length === 0) {
        var replyParts = [];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(this.games)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            var game = this.games[key];
            var part = '**' + game.name + '** (' + game.players.length + '/' + game.spots + ')';
            replyParts.push(part);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        ;

        reply = replyParts.join(' :: ');

        // List the requested games
      } else {
        var _games = this.getGamesFromArgs(args);

        if (_games.length) {
          var _replyParts = [];

          _games.forEach(function (g) {
            var game = _this3.games[g];

            var part = '**' + game.name + '** ';
            part += '(' + game.players.length + '/' + game.spots + ') :: ';
            part += game.players.map(function (elem) {
              return elem.name;
            }).join(' ');

            _replyParts.push(part);
          });

          reply = _replyParts.join('\n');
        } else {
          reply = 'Could not find a game by that name.';
        }
      }

      message.channel.sendMessage(reply);
    }
  }, {
    key: 'promote',
    value: function promote(args, message) {
      message.channel.sendMessage();
    }
  }]);

  return Bot;
}();

exports.default = Bot;