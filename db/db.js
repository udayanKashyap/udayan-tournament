const { Sequelize, DataTypes } = require("sequelize");
const { connection_string } = require("../utils/config");
const initModels = require("../models/init_models");

const sequelize = new Sequelize(connection_string, { logging: false });
try {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected...");
    })
    .catch((err) => {
      console.log("Error ", err);
    });
} catch (error) {
  console.log("Error ", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = initModels(sequelize, DataTypes);

// Syncing the database with sequelize.
db.sequelize
  .sync({ force: false, alter: { drop: false } })
  .then(() => {
    console.log("Re-sync done!");
  })
  .catch((err) => {
    console.log("Error ", err);
  });

module.exports = db;
