const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

module.exports = {
  serve: (opts) => {
    process.env.NODE_ENV = opts.prod ? 'production' : 'development';
    process.env.PORT = opts.port || 5000; // TODO: Get port automations.

    const { NODE_PATH, NODE_ENV, PORT } = process.env;
    const appServer = path.join(NODE_PATH, 'bootstrap', 'app.js');
    const spawnOptions = {
      stdio: opts.silent ? 'pipe' : 'inherit',
    };

    const BIN_NODEMON = path.resolve(NODE_PATH, 'node_modules', '.bin', 'nodemon');

    const runner = NODE_ENV === 'production'
      ? spawn('node', [appServer], spawnOptions)
      : spawn(BIN_NODEMON, [appServer], spawnOptions);

    const logStream = filename => fs.createWriteStream(path.resolve(NODE_PATH, 'storage', 'logs', filename), 'utf8');

    process.stdout.write(`
  PID:  ${process.pid}
  MODE: ${NODE_ENV}
  HOST: ${process.env.HOST || '127.0.0.1'}
  PORT: ${PORT}\n
`);

    if (opts.silent) {
      runner.stdout.pipe(logStream('server.log'));
      runner.stderr.pipe(logStream('server.log'));
    }
  },
};
