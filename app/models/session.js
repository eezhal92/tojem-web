module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('session', {
    sid: {
      type: DataTypes.STRING(32),
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  return Session;
};
