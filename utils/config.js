require("dotenv").config();

module.exports = {
  connection_string: process.env.CONNECTION,
  jwt_secret:process.env.JWT_SECRET
};
