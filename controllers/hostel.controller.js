const db = require("../db/db");
const { hostels } = db.models;

const getHostel = async (_, res, next) => {
  try {
    const data = await hostels.findAll();
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const createHostel = async (req, res, next) => {
  try {
    const { name, password, boarders } = req.body;
    const data = await hostels.create({ name, password, boarders });
    res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHostel,
  createHostel,
};
