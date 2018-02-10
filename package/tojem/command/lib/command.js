const env = require('../../env');
const arrify = require('../../arrify');
const config = require('../../config');
const log = require('./log');
const runner = require('./runner');
const sequelize = require('./sequelize');
const collections = require('./collections');

class Command {
  constructor(command, describe) {
    this.sequelize = sequelize;
    this.config = config;
    this.env = env;
    this.log = log;
    this.run = runner;
    this.entry = {
      command,
      describe,
      options: {},
      exec: null,
    };
  }

  describe(messages) {
    this.entry.describe = messages;

    return this;
  }

  options(options = []) {
    arrify(options).forEach((obj) => {
      if (typeof obj.alias === 'string') {
        obj.alias = obj.alias.trim(); // eslint-disable-line no-param-reassign
        obj.alias = obj.alias === '' ? null : obj.alias; // eslint-disable-line no-param-reassign
      }

      this.entry.options[obj.name] = {
        name: null,
        alias: null,
        default: null,
        describe: null,
        ...obj,
      };
    });

    return this;
  }

  handler(handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('command handler should be a function');
    }

    this.entry.exec = handler.bind(this);
  }
}

module.exports = (name, describe) => {
  const command = new Command(name, describe);

  collections.set(name, command.entry);

  return command;
};
