module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    basePrice: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.get('basePrice') + this.get('profit');
      },
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.store);
    Product.hasMany(models.productImage);
  };

  return Product;
};
