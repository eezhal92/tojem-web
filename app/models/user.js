module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Store, { foreignKey: 'ownerId' });
      },
    },
  });

  return User;
};
