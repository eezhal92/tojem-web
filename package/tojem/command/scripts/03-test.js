const path = require('path');
const { spawn } = require('child_process');

module.exports = (command) => {
  command('test:all')
    .describe('Running all test.')
    .handler(function (args, opts) {
      this.log.info([
        '> Comming soon.',
        '  Run all test integration.',
      ]);
    });

  command('test:e2e')
    .describe('Running browser test (e2e).')
    .handler(async function (args, opts) {
      opts = Object.assign({}, opts, { // eslint-disable-line no-param-reassign
        silent: !opts.verbose && true,
        test: true,
      });

      await this.run('db:drop', [], opts);
      await this.run('db:create', [], opts);
      await this.run('db:migrate', [], opts);

      const BASE_PATH = path.resolve(this.config.get('dir.base'));
      const BIN = path.join(BASE_PATH, 'node_modules', '.bin', 'nightwatch');
      const serverProcess = await this.run('serve', [], opts);
      const processArgv = [
        ...args,
        '--config',
        path.resolve(this.config.get('dir.config'), 'nightwatch.js'),
      ];

      const browser = spawn(BIN, processArgv, {
        stdio: 'inherit',
        env: {
          ...this.env(opts),
          NODE_PATH: [
            BASE_PATH,
            path.resolve(this.config.get('dir.package')),
          ].join(path.delimiter),
        },
      });

      require('module').Module._initPaths();

      const killProcess = (code) => {
        process.kill(serverProcess.pid);
        process.exit(code || 0);
      };

      this.log.info([
        '> Running - browser test e2e.',
        `  pid: ${browser.pid}`,
        `  bin: ${path.basename(browser.spawnfile)}`,
      ], opts);

      browser
        .on('close', killProcess)
        .on('exit', killProcess);
    });
};
