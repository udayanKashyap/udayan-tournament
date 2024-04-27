const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { students } = db.models;

const getStudent = catchAsync(async(req, res) => {
    const data = await students.findAll();
    res.send(data);
});

const createStudent = catchAsync(async(req, res) => {
    const { roll_no, name, address, contact_number, age, gender, hostel_id } = req.body;
    const data = await students.create({ roll_no, name, address, contact_number, age, gender, hostel_id })
    res.send(data);
});


module.exports = {
    getStudent,
    createStudent,
};