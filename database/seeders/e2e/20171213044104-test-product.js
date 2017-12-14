module.exports = {
  up: (queryInterface) => {
    const insertQuery = queryInterface.bulkInsert('products', [{
      storeId: 1,
      name: 'Bakso Bakar',
      price: 10000,
      description: 'lorem',
      createdAt: '2017-12-12',
      updatedAt: '2017-12-12',
    }, {
      storeId: 1,
      name: 'Nasi Goreng',
      price: 15000,
      description: 'lorem',
      createdAt: '2017-12-12',
      updatedAt: '2017-12-12',
    }], {});

    return insertQuery;
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
