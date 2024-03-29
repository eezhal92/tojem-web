// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { filterNominal } from '../lib/price';

const baseOptions = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
};

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
    ...baseOptions,
    onUploadProgress,
  }).then(response => response.data);
}

export function deleteProductImage({ productId, imageId }) {
  return axios.delete(`/api/products/${productId}/images/${imageId}`);
}

export function create(payload = {}) {
  const postAction = '/api/products/create';

  return axios.post(postAction, {
    ...payload,
    basePrice: filterNominal(payload.basePrice),
    profit: filterNominal(payload.profit),
  }, baseOptions).then(response => response.data);
}

export function update(payload = {}) {
  const postAction = '/api/products/update';

  return axios.post(postAction, {
    ...payload,
    basePrice: filterNominal(payload.basePrice),
    profit: filterNominal(payload.profit),
  }, baseOptions).then(response => response.data);
}

export function getAll() {
  return axios.get('/api/products')
    .then(response => response.data);
}

export default {
  uploadProductImage,
  deleteProductImage,
  create,
  update,
};
