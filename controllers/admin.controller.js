const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { admins } = db.models;

const createAdmin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const data = await admins.create({ username, password });
  res.send(data);
});

module.exports = {
  createAdmin,
};
