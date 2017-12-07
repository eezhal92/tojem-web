module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    facebookId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};
