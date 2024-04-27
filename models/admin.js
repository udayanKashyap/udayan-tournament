module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      underscored: true,
    },
  );
};
