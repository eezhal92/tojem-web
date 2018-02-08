const fs = require('fs');
const path = require('path');
const runner = require('./lib/runner');
const command = require('./lib/command');

fs.readdirSync(path.resolve(__dirname, 'scripts'))
  .filter(fp => path.extname(fp) === '.js')
  .forEach((moduleId) => {
    try {
      const setupCommand = require(path.resolve(__dirname, 'scripts', moduleId));

      setupCommand(command);
    } catch (_) {
      //
    }
  });

module.exports.run = runner;
