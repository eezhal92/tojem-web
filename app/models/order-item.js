module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        OrderItem.belongsTo(models.Order);
      },
    },
  });

  return OrderItem;
};
