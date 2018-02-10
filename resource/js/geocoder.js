/* global document navigator google */
/* eslint-disable import/no-extraneous-dependencies */
const cookie = require('js-cookie');

const cleanCityName = cityName =>
  cityName.split(' City')
    .filter(i => !!i)
    .join('')
    .split(' Regency')
    .filter(i => !!i)
    .join('');

function initGeocoding(successCallback, failCallback) {
  const geocoder = new google.maps.Geocoder();
  const supportGeolocation = 'geolocation' in navigator;

  if (!supportGeolocation) {
    return;
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const latlng = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    const geocodeHandler = (results, status) => {
      if (status !== 'OK') {
        // eslint-disable-next-line no-console
        console.log(`Geocoder failed: ${status}`);
        failCallback();

        return;
      }

      if (!results[1]) {
        // eslint-disable-next-line no-console
        console.log('No results found');
        failCallback();

        return;
      }

      const addressComponents = results[1].address_components;
      let cityName;

      for (let i = 0; i < addressComponents.length; i++) { // eslint-disable-line no-plusplus
        if (addressComponents[i].types.indexOf('locality') !== -1) {
          cityName = addressComponents[i].long_name;

          break;
        }

        if (addressComponents[i].types.indexOf('administrative_area_level_2') !== -1) {
          cityName = cleanCityName(addressComponents[i].long_name);

          break;
        }
      }

      if (cityName) {
        cookie.set('location', cityName);
        successCallback(cityName);
      }
    };

    geocoder.geocode({ location: latlng }, geocodeHandler);
  }, failCallback);
}

module.exports = initGeocoding;
