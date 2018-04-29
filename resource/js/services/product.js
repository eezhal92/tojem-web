// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

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
  })
    .then(response => response.data);
}

export default {
  uploadProductImage,
};
