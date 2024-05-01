const { where } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { admins } = db.models;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../utils/config");

const createAdmin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const data = await admins.create({ username, password });
  res.send(data);
});

const adminLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const data = await admins.findOne({
    where: {
      username, password
    }
  })
  if (!data) {
    throw new ApiError(404, "Admin not found")
  }
  const token = jwt.sign({ userType: "admin", username: data.username }, jwt_secret)
  res.send({
    token,
    data: { userType: "admin", username: data.username }
  })
})

module.exports = {
  createAdmin,
  adminLogin,
};
