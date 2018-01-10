const products = require('./fixtures/products');

module.exports = {
  up: (queryInterface) => {
    const insertQuery = queryInterface.bulkInsert('products', products, {});

    return insertQuery;
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
