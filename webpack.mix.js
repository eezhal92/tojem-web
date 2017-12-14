/* eslint-disable import/no-extraneous-dependencies */

const { mix } = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resource/js/pages/pos.js', 'public/js');

mix.sass('resource/scss/style.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.js')],
  });
