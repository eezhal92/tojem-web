module.exports = {
  up: (queryInterface, Sequelize) => {
    const query = queryInterface.addColumn('order_items', 'productProfit', {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      after: 'productPrice',
    });

    return query;
  },

  down: (queryInterface, Sequelize) => {
    const query = queryInterface.removeColumn('order_items', 'productProfit', {});

    return query;
  },
};
