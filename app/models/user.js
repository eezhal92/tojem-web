module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    facebookId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.store, { foreignKey: 'ownerId' });
      },
    },
  });

  return User;
};
