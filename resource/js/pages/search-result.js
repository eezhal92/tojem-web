/* global document navigator google */
/* eslint-disable import/no-extraneous-dependencies */

const cookie = require('js-cookie');
const initGeocoding = require('../geocoder');

const location = cookie.get('location');
const $location = document.querySelector('#location');

const showUserLocation = (userLocation) => {
  $location.innerHTML = `Lokasi Anda <strong>${userLocation}</strong>`;
};

const showFailMessage = () => {
  $location.innerHTML = 'Maaf, tidak dapat memuat lokasi Anda';
};

if (location) {
  showUserLocation(location);
}

const $findLocationButton = document.querySelector('#find-location');


if ($findLocationButton) {
  $findLocationButton.addEventListener('click', () => {
    $location.innerHTML = 'Memuat lokasi Anda...';

    initGeocoding(showUserLocation, showFailMessage);
  });
}
