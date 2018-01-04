const { orderItems } = require('./fixtures/orders');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const insertQuery = queryInterface.bulkInsert('order_items', orderItems, {});

    return insertQuery;
  },

  down: queryInterface => queryInterface.bulkDelete('order_items', null, {}),
};
