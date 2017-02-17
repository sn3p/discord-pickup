import discord from 'discord.js';
import logger from 'winston';

class Bot {
  constructor(options) {
    this.token = options.token;
    this.client = new discord.Client();
  }

  connect() {
    logger.debug('Connecting to Discord');
    this.client.login(this.token);
    this.attachListeners();
  }

  attachListeners() {
    this.client.on('ready', () => {
      logger.info('Connected to Discord');
    });

    // TODO: this doesn't trigger when a message is edited
    this.client.on('message', (message) => {
    });

    this.client.on('error', (error) => {
      logger.error('Received error event from Discord', error);
    });

    this.client.on('warn', (warning) => {
      logger.warn('Received warn event from Discord', warning);
    });
  }

  parseMessage() {
    const author = message.author;

    // Ignore messages sent by the bot itself
    if (author.id === this.client.user.id) {
      return;
    }

    // Parse command and arguments
    if (message.content.startsWith('.')) {
      const content = message.content.toLowerCase();
      const args = content.trim().split(/\s+/);
      const command = args.shift().substr(1);

      if (!command.length) {
        return;
      }

      // message.reply('pong');
      message.channel.sendMessage([
        '```',
        `The command was '${command}' with the arugments: ${args.join(', ')}`,
        '```'
      ].join(''));
    }
  }
}

export default Bot;
