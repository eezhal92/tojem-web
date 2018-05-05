// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import price from '../lib/price';

/**
 * @param  {Number}   options.productId
 * @param  {File}     options.file
 * @param  {Function} options.onUploadProgress
 * @return {Promise}
 */
export function uploadProductImage({
  productId,
  file,
  onUploadProgress = () => {},
}) {
  const payload = new FormData();

  payload.append('image', file);

  return axios.post(`/api/products/${productId}/images`, payload, {
      onUploadProgress,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then((response) => response.data);
}

export function create(payload = {}) {
  const postAction = '/api/products/create';

  payload = {
    ...payload,
    basePrice: price.filterNominal(payload.basePrice),
    profit: price.filterNominal(payload.profit),
  };

  return axios.post(postAction, payload, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then(response => response.data);
}

export default {
  uploadProductImage,
  create,
};
