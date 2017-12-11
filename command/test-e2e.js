const path = require('path');
const { spawn } = require('child_process');

module.exports = {
  /**
   * Running e2e test.
   *
   *  - refresh database (rollback, migrate up).
   *  - fireup http server.
   *  - execute e2e (nightwatch).
   *  - exit http server.
   *
   * @param  {object} opts  The CLI flags
   * @return {void}
   */
  'test:e2e': async function e2eTest(opts = {}) {
    opts = { ...opts, silent: true, test: true }; // eslint-disable-line no-param-reassign

    const { NODE_PATH } = process.env;
    const BIN_NIGHTWATCH = path.resolve(NODE_PATH, 'node_modules', '.bin', 'nightwatch');

    const refreshDatabase = this['db:migrate:refresh'].bind(this);
    const bootingServer = this.serve.bind(this);

    await refreshDatabase(opts);

    const serverProcess = await bootingServer(opts);
    const e2eProcess = spawn(BIN_NIGHTWATCH, [], {
      stdio: 'inherit',
    });

    const killProcess = (code) => {
      process.kill(serverProcess.pid);
      process.exit(code || 0);
    };

    e2eProcess
      .on('close', killProcess)
      .on('exit', killProcess);

    process.stdout.write(`
  e2e:
    pid: ${e2eProcess.pid}
    bin: ${path.basename(e2eProcess.spawnargs[0])}\n
`);
  },
};
