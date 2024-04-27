module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "hostel",
    {
      name: {
        type: DataTypes.STRING,
      },
      boarders: {
        type: DataTypes.INTEGER,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    },
  );
};
