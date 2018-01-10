const { orders } = require('./fixtures/orders');

module.exports = {
  up: (queryInterface) => {
    const insertQuery = queryInterface.bulkInsert('orders', orders, {});

    return insertQuery;
  },

  down: queryInterface => queryInterface.bulkDelete('orders', null, {}),
};
