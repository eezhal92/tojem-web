const config = require('../config');
const command = require('../command');

class BaseProvider {
  constructor(app) {
    this.app = app;
    this.config = config;
    this.command = command;
  }

  handle() {
    throw new Error('provider.handle() should be implement');
  }
}

exports.default = BaseProvider;
module.exports = BaseProvider;
