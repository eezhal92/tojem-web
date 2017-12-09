module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        Product.belongsTo(models.Price);
      },
    },
  });

  return Product;
};
