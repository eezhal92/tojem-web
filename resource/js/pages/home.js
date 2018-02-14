/* global document navigator google */
/* eslint-disable import/no-extraneous-dependencies */

const cookie = require('js-cookie');
const initGeocoding = require('../geocoder');

const $location = document.querySelector('#location');

const showFailMessage = () => {
  $location.innerHTML = 'Tidak dapat memuat lokasi Anda 😭';
};

const easterEggMessage = (city) => {
  switch (city) {
    case 'Palu':
      return 'Napane le  🌞';
    case 'Salatiga':
      return 'Adem le` ❄️';
    case 'Yogyakarta':
      return 'Jogja istimewa. Pie kabare dab!';
    default:
      return '';
  }
};

const showUserLocation = (cityName) => {
  $location.innerHTML = `Lokasi Anda: ${cityName} <br> ${easterEggMessage(cityName)}`;
};

const location = cookie.get('location');

if (location) {
  showUserLocation(location);
} else {
  initGeocoding(showUserLocation, showFailMessage);
}

