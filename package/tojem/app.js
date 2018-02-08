const express = require('express');
const arrify = require('./arrify');
const config = require('./config');
const BaseProvider = require('./providers/base-provider');

function esNext(pkg) {
  const obj = 'default' in pkg ? pkg : { default: pkg };

  return obj.default;
}

module.exports = (app) => {
  app = app || express(); // eslint-disable-line no-param-reassign

  arrify(config.get('app.providers')).forEach((moduleId) => {
    if (!moduleId) {
      return;
    }

    const Provider = esNext(require(moduleId));
    const provider = new Provider(app);

    if (provider instanceof BaseProvider) {
      provider.handle();
    }
  });

  return app;
};
