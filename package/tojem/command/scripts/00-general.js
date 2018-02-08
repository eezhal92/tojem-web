const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

module.exports = (command) => {
  command('init', 'Initialize application.')
    .handler(function (args, opts) {
      const BASE_PATH = this.config.get('dir.base');
      const envFilepath = path.join(BASE_PATH, '.env');

      if (fs.existsSync(envFilepath)) {
        return this.log.info('Ok');
      }

      fs.createReadStream(path.join(BASE_PATH, '.env.example'))
        .pipe(fs.createWriteStream(envFilepath), 'utf8');

      return this.log.success('Create `.env` file.');
    });

  command('serve', 'Fire http server application.')
    .options([{
      name: 'prod',
      alias: 'p',
      type: 'boolean',
      default: false,
      describe: 'Set for production mode.',
    }, {
      name: 'port',
      alias: null,
      type: 'number',
      default: 3000,
      describe: 'Set server port.',
    }])
    .handler(function (args, opts) {
      const BASE_PATH = path.resolve(this.config.get('dir.base'));
      const outWrite = fs.openSync(path.join(BASE_PATH, 'storage', 'logs', 'server.log'), 'a');
      const errWrite = fs.openSync(path.join(BASE_PATH, 'storage', 'logs', 'server.log'), 'a');

      const processOptions = {
        stdio: opts.silent ? ['ignore', outWrite, errWrite] : 'inherit',
        env: {
          ...this.env(opts),
          PORT: opts.port,
          NODE_PATH: [
            BASE_PATH,
            path.resolve(this.config.get('dir.package')),
          ].join(path.delimiter),
        },
      };

      const { NODE_ENV, PORT } = processOptions.env;
      const isDev = NODE_ENV !== 'production';
      const BIN = NODE_ENV !== 'test' && isDev
        ? path.join(BASE_PATH, 'node_modules', '.bin', 'nodemon')
        : 'node';

      const argv = [
        path.join(BASE_PATH, 'bootstrap', 'app.js'),
      ];

      if (isDev) {
        argv.push.apply(argv, [
          '--config',
          path.resolve(this.config.get('dir.config'), 'nodemon.json'),
        ]);
      }

      const serverProcess = spawn(BIN, argv, processOptions);
      require('module').Module._initPaths();

      if (isDev) {
        this.log.info([
          '> Running - process http server.',
          `  pid: ${serverProcess.pid}`,
          `  bin: ${path.basename(serverProcess.spawnfile)}`,
          `  env: ${NODE_ENV}`,
          `  url: http://localhost:${PORT}`,
        ], opts);
      }

      return Promise.resolve()
        .then(() => serverProcess);
    });
};
