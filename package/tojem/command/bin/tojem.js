#!/usr/bin/env node

try {
  require('../cli').fire();
} catch (err) {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
}
