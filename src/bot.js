import discord from 'discord.js';
import logger from 'winston';
import * as games from './games';

class Bot {
  constructor(options) {
    this.token = options.token;
    this.prefix = options.prefix;
    this.discord = new discord.Client();

    // Initialize game types
    this.games = {}
    for (const key of Object.keys(games)) {
      this.games[key] = new games[key]();
    }
  }

  connect() {
    logger.info('Connecting to Discord');
    this.discord.login(this.token);
    this.attachListeners();
  }

  attachListeners() {
    this.discord.on('ready', () => {
      logger.info('Connected to Discord');
    });

    // TODO: this doesn't trigger when a message is edited
    this.discord.on('message', this.parseMessage.bind(this));

    this.discord.on('error', error => {
      logger.error('Received error event from Discord', error);
    });

    this.discord.on('warn', warning => {
      logger.warn('Received warn event from Discord', warning);
    });
  }

  parseMessage(message) {
    // Ignore messages sent by the bot itself
    if (message.author.id === this.discord.user.id) {
      return;
    }

    // Parse command and arguments
    if (message.content.startsWith(this.prefix)) {
      const content = message.content.toLowerCase();
      const args = content.trim().split(/\s+/);
      const command = args.shift().substr(1);

      if (command.length) {
        this.command(command, args, message);
      }
    }
  }

  getGamesFromArgs(args) {
    const games = [];
    args.some(arg => {
      if (this.games.hasOwnProperty(arg)) {
        games.push(arg);
      } else {
        return true;
      }
    });
    return games;
  }

  startPicking(args) {
  }

  /**
   * Command
   */
  command(command, args, message) {
    switch (command) {
      // Join
      case 'j':
      case 'join': {
        this.join(args, message);
        break;
      }

      // Leave
      case 'l':
      case 'leave': {
        this.leave(args, message);
        break;
      }

      // List
      case 'ls':
      case 'list': {
        this.list(args, message);
        break;
      }

      // Promote
      case 'p':
      case 'promote': {
        this.promote(args, message);
        break;
      }
    }
  }

  /**
   * Join command
   */
  join(args, message) {
    // Check for games types in arguments
    const games = this.getGamesFromArgs(args);
    if (!games.length) {
      message.channel.sendMessage('Could not find a pug by this name.');
      return false;
    }

    const joined = [];

    games.every(type => {
      const game = this.games[type];
      const player = game.addPlayer(message.author);

      // console.log(player)

      // The player was not added
      if (!player) {
        message.channel.sendMessage(
          `${message.author.username} could not be added :(`
        );
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
      message.channel.sendMessage(
        `${message.author.username} joined **${joined.join(' ')}**`
      );
    }
  }

  /**
   * Leave command
   */
  leave(args, message) {
  }

  /**
   * List command
   */
  list(args, message) {
    let reply;

    // Without aruments list all games
    if (args.length === 0) {
      const replyParts = [];

      for (const key of Object.keys(this.games)) {
        const game = this.games[key];
        const part = `**${game.name}** (${game.players.length}/${game.spots})`;
        replyParts.push(part);
      };

      reply = replyParts.join(' :: ');

    // List the requested games
    } else {
      const games = this.getGamesFromArgs(args);

      if (games.length) {
        const replyParts = [];

        games.forEach(g => {
          const game = this.games[g];

          let part = `**${game.name}** `;
          part += `(${game.players.length}/${game.spots}) :: `;
          part += game.players.map(elem => {
            return elem.name;
          }).join(' ');

          replyParts.push(part);
        });

        reply = replyParts.join('\n');

      } else {
        reply = 'Could not find a game by that name.';
      }
    }

    message.channel.sendMessage(reply);
  }

  promote(args, message) {
    message.channel.sendMessage(
      // `@here x player(s) needed for iCTF`
    );
  }
}

export default Bot;
