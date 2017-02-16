import discord from 'discord.js';
import logger from 'winston';

class Bot {
  constructor(options) {
    this.token = options.token;
    this.discord = new discord.Client();
  }

  connect() {
    logger.debug('Connecting to Discord');
    this.discord.login(this.token);
    this.attachListeners();
  }

  attachListeners() {
    this.discord.on('ready', () => {
      logger.info('Connected to Discord');
    });

    this.discord.on('message', (message) => {
      const author = message.author;

      // Ignore messages sent by the bot itself
      if (author.id === this.discord.user.id) {
        return;
      }

      if (message.content === 'ping') {
        message.reply('ping');
      }
    });

    this.discord.on('error', (error) => {
      logger.error('Received error event from Discord', error);
    });

    this.discord.on('warn', (warning) => {
      logger.warn('Received warn event from Discord', warning);
    });
  }
}

export default Bot;
