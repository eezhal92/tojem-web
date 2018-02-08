delete require.cache[__filename];

module.exports = (options) => {
  const opts = Object.assign({
    prod: false,
    test: false,
    port: 3000,
  }, options);

  try {
    require('dotenv').config();
  } catch (_) {
    //
  }

  return {
    ...process.env,
    NODE_ENV: (() => {
      if (opts.test) {
        return 'test';
      }

      return opts.prod ? 'production' : 'development';
    })(),
  };
};
