module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    location: DataTypes.STRING,
    channel: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  Order.associate = (models) => {
    Order.hasMany(models.orderItem);
  };

  return Order;
};
