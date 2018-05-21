module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('orderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productProfit: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
  }, {
    tableName: 'order_items',
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.order);
  };

  return OrderItem;
};
