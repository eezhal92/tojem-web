module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    basePrice: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.store);
    Product.hasMany(models.productImage);
  };

  return Product;
};
