module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      password: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    },
  );
};
