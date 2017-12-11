module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    location: DataTypes.STRING,
    channel: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Order.hasMany(models.OrderItem);
      },
    },
  });
  return Order;
};
