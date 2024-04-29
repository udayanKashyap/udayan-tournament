const _hostels = require("./hostel");
const _tournaments = require("./tournaments");
const _students = require("./students");
const _matches = require("./matches");
const _admin = require("./admin");
const _tournament_participants = require("./tournament_participants");

const initModels = (sequelize, DataTypes) => {
  var hostels = _hostels(sequelize, DataTypes);
  var tournaments = _tournaments(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var matches = _matches(sequelize, DataTypes);
  var admins = _admin(sequelize, DataTypes);
  var tournament_participants = _tournament_participants(sequelize, DataTypes);

  // relationship between matches and tournaments
  matches.belongsTo(tournaments, {
    foreignKey: { allowNull: false, name: "tournament_id" },
  });
  tournaments.hasMany(matches, {
    foreignKey: { allowNull: false, name: "tournament_id" },
  });
  // relationship between hostels and students
  students.belongsTo(hostels, {
    foreignKey: { allowNull: false, name: "hostel_id" },
  });
  hostels.hasMany(students, {
    foreignKey: { allowNull: false, name: "hostel_id" },
  });
  // relationship between students and tournaments
  students.belongsTo(tournaments, {
    foreignKey: { name: "tournament_id" },
  });
  tournaments.hasMany(students, {
    foreignKey: { name: "tournament_id" },
  });
  // hostels and tournaments
  hostels.belongsToMany(tournaments, {
    through: tournament_participants,
    foreignKey: { allowNull: false, name: "hostel_id" },
  });
  tournaments.belongsToMany(hostels, {
    through: tournament_participants,
    foreignKey: { allowNull: false, name: "tournament_id" },
  });
  // realationship between matches and hostels
  matches.belongsTo(hostels, {
    foreignKey: { allowNull:true, name: "hostel_id_1"},
  });
  hostels.hasMany(matches, {
    foreignKey: {allowNull: true, name: "hostel_id_1"},
  });
  matches.belongsTo(hostels, {
    foreignKey: { allowNull:true, name: "hostel_id_2"},
  });
  hostels.hasMany(matches, {
    foreignKey: {allowNull: true, name: "hostel_id_2"},
  });
  matches.belongsTo(hostels, {
    foreignKey: { allowNull:true, name: "winner"},
  });
  hostels.hasMany(matches, {
    foreignKey: {allowNull: true, name: "winner"},
  });

  return {
    hostels,
    students,
    tournaments,
    matches,
    admins,
    tournament_participants,
  };
};
module.exports = initModels;
