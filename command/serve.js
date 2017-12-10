const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { setupEnv } = require('./utils/env');

module.exports = {
  /**
   * Fire up app server
   *
   * @param  {object}  opts   The CLI flags
   * @return {Promise}
   */
  serve(opts) {
    setupEnv(opts);

    const { NODE_PATH, NODE_ENV, PORT } = process.env;
    const outWrite = fs.openSync(path.join(NODE_PATH, 'storage', 'logs', 'server.log'), 'a+');
    const errWrite = fs.openSync(path.join(NODE_PATH, 'storage', 'logs', 'server.log'), 'a+');
    const appServer = path.join(NODE_PATH, 'bootstrap', 'app.js');
    const BIN_NODEMON = path.resolve(NODE_PATH, 'node_modules', '.bin', 'nodemon');

    const spawnOptions = {
      stdio: opts.silent ? ['ignore', outWrite, errWrite] : 'inherit',
    };

    const serverProcess = (NODE_ENV === 'development')
      ? spawn(BIN_NODEMON, [appServer], spawnOptions)
      : spawn('node', [appServer], spawnOptions);

    if (NODE_ENV !== 'production') {
      process.stdout.write(`> Running - local http server.

  process:
    pid: ${process.pid}
    bin: ${path.basename(process.argv[1])}

  server:
    pid: ${serverProcess.pid}
    bin: ${path.basename(serverProcess.spawnargs[0])}
    env: ${NODE_ENV}
    url: http://localhost:${PORT}
`);
    }

    return Promise.resolve(serverProcess);
  },
};
