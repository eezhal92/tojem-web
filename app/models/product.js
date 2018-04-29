module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.store);
    Product.hasMany(models.productImage);
  };

  return Product;
};
