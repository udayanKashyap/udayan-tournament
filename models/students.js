module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "student",
    {
      roll_no: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );
};
