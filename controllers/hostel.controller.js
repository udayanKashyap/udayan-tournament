const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { hostels } = db.models;

const getHostel = catchAsync(async (_, res) => {
  const data = await hostels.findAll();
  res.send(data);
});

const createHostel = catchAsync(async (req, res) => {
  const { name, password, boarders } = req.body;
  const data = await hostels.create({ name, password, boarders });
  res.send(data);
});

module.exports = {
  getHostel,
  createHostel,
};
