module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
  });

  return Product;
};
