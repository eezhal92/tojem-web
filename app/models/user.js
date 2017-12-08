module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};
