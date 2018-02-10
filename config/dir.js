const path = require('path');

module.exports = {
  base: path.resolve(__dirname, '..'),
  app: path.resolve(__dirname, '..', 'app'),
  config: path.resolve(__dirname, '..', 'config'),
  public: path.resolve(__dirname, '..', 'public'),
  database: path.resolve(__dirname, '..', 'database'),
  view: path.resolve(__dirname, '..', 'resource/views'),
  storage: path.resolve(__dirname, '..', 'storage'),
  package: path.resolve(__dirname, '..', 'package'),
};
