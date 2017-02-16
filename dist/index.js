#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readJSONConfig(filePath) {
  var configFile = _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
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

var config = readJSONConfig(__dirname + '/../config.json');
var bot = new _bot2.default(config);
bot.connect();