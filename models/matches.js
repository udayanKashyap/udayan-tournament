module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "matches",
    {
      date: {
        type: DataTypes.DATE,
      },
      stage: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    },
  );
};
