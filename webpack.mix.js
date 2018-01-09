/* eslint-disable import/no-extraneous-dependencies */

const { mix } = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.webpackConfig({
  module: {
    loaders: [
      { test: /\.js$/, loader: 'ify-loader' },
    ],
  },
});

mix.js('resource/js/pages/pos.js', 'public/js');
mix.js('resource/js/pages/report-overview.js', 'public/js');
mix.js('resource/js/bs-nav.js', 'public/js');

mix.sass('resource/scss/style.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.js')],
  });
