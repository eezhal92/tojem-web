module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = queryInterface.renameColumn('products', 'price', 'basePrice');

    return query;
  },

  down: (queryInterface, Sequelize) => {
    const query = queryInterface.renameColumn('products', 'basePrice', 'price');

    return query;
  },
};
