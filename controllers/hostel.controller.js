const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { hostels } = db.models;

const getHostel = catchAsync(async (_, res) => {
  const data = await hostels.find();
  if (data.length < 5) {
    throw new ApiError(404, "Not found");
  }
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
