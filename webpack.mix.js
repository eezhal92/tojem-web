/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.webpackConfig({
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'ify-loader',
      },
    ],
  },
});

mix.js('resource/js/bs-nav.js', 'public/js');

mix.js('resource/js/pages/home.js', 'public/js');
mix.js('resource/js/pages/search-result.js', 'public/js');
mix.js('resource/js/pages/pos.js', 'public/js');
mix.js('resource/js/pages/report-overview.js', 'public/js');
mix.js('resource/js/pages/product-detail.js', 'public/js');

mix.js('resource/js/pages/backstore/product-list.js', 'public/js/backstore');
mix.js('resource/js/pages/backstore/product-detail.js', 'public/js/backstore');
mix.js('resource/js/pages/backstore/product-create.js', 'public/js/backstore');
mix.js('resource/js/pages/backstore/product-edit.js', 'public/js/backstore');

mix.sass('resource/scss/style.scss', 'public/css').options({
  processCssUrls: false,
  postCss: [
    tailwindcss(path.join(__dirname, 'resource', 'vendors', 'tailwind.js')),
  ],
});
