module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "hostel",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boarders: {
        type: DataTypes.INTEGER,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );
};
