const path = require('path');
const kebabCase = require('lodash/kebabCase');

delete require.cache[__filename];

const getObjPath = (keys, obj) => {
  let ret;

  if (keys.length > 1) {
    ret = obj[keys[0]];

    keys.shift();

    ret = getObjPath(keys, ret);
  } else {
    ret = obj[keys[0]];
  }

  return ret || null;
};

const config = {
  cwd: path.resolve(process.cwd(), 'config'),
  get(key = '') {
    const segments = key.split('.');

    if (segments.length === 0) {
      return null;
    }

    const moduleId = path.join(this.cwd, kebabCase(segments[0]));
    const obj = require(moduleId);

    segments.shift();

    return getObjPath(segments, obj) || obj;
  },
};

module.exports = config;
