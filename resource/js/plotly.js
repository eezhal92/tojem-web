/* eslint-disable import/no-extraneous-dependencies, global-require */
const Plotly = require('plotly.js/lib/core');

// Load in the trace types for pie, and choropleth
Plotly.register([
  require('plotly.js/lib/bar'),
]);

module.exports = Plotly;
