module.exports = {
  up: (queryInterface) => {
    const data = [
      {
        storeId: 1,
        name: 'Bakso Bakar',
        basePrice: 8000,
        profit: 2000,
        description: 'lorem',
        createdAt: '2017-12-12',
        updatedAt: '2017-12-12',
      },
      {
        storeId: 1,
        name: 'Nasi Goreng',
        basePrice: 12000,
        profit: 3000,
        description: 'lorem',
        createdAt: '2017-12-12',
        updatedAt: '2017-12-12',
      },
    ];

    const insertQuery = queryInterface.bulkInsert('products', data, {});

    return insertQuery;
  },

  down: (queryInterface) => queryInterface.bulkDelete('products', null, {}),
};
