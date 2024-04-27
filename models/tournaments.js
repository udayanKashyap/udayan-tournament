module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tournament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    },
  );
};
