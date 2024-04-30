const { where } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { hostels } = db.models;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../utils/config");
const tournament_participants = require("../models/tournament_participants");

const getHostel = catchAsync(async (_, res) => {
  const data = await hostels.findAll();
  res.send(data);
});

const createHostel = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const data = await hostels.create({ name, password });
  res.send(data);
});

const hostelLogin = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const data = await hostels.findOne({
    where: {
      name, password
    }
  })
  if (!data) {
    throw new ApiError(404, "Hostel not found")
  }
  const token = jwt.sign({ name: data.name, id: data.id }, jwt_secret)
  res.send({ token, data: { name: data.name, id: data.id } })
})

module.exports = {
  getHostel,
  createHostel,
  hostelLogin
};
