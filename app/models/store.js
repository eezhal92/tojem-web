module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    location: DataTypes.STRING,
  });

  Store.associate = (models) => {
    Store.belongsTo(models.user, { foreignKey: 'ownerId' });
  };

  return Store;
};
