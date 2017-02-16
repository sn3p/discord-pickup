#!/usr/bin/env node

import fs from 'fs';
import Bot from './bot';

function readJSONConfig (filePath) {
  const configFile = fs.readFileSync(filePath, { encoding: 'utf8' });
  try {
    return JSON.parse(configFile);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error('The configuration file contains invalid JSON.');
    } else {
      throw err;
    }
  }
}

const config = readJSONConfig(__dirname + '/../config.json');
const bot = new Bot(config);
bot.connect();
