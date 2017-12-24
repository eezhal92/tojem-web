module.exports = {
  up: (queryInterface, Sequelize) => {
    const table = queryInterface.createTable('sessions', {
      sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      expires: {
        type: Sequelize.DATE,
      },
      data: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return table;
  },

  down: queryInterface => queryInterface.dropTable('sessions'),
};
