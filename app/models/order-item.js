module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('orderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
  }, {
    tableName: 'order_items',
    classMethods: {
      associate: (models) => {
        OrderItem.belongsTo(models.Order);
      },
    },
  });

  return OrderItem;
};
