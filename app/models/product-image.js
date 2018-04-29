module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('productImage', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {
    tableName: 'product_images',
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.product);
  };

  return ProductImage;
};
