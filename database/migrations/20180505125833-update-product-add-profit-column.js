module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = queryInterface.addColumn('products', 'profit', {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: 'basePrice',
    });

    return query;
  },

  down: (queryInterface, Sequelize) => {
    const query = queryInterface.removeColumn('products', 'profit', {});

    return query;
  },
};
