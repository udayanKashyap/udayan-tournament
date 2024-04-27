module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tournament_participant",
    {
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
    },
  );
};
