module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    facebookId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.store, { foreignKey: 'ownerId' });
  };

  return User;
};
