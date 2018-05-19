import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies

const baseOptions = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
};

export function createOrder(orders = {}) {
  return axios.post('/api/orders', orders, {
    ...baseOptions,
  });
}

export default {
  createOrder,
};
