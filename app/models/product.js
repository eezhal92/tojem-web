module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  return Product;
};
