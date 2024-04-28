const { where, Op } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { tournaments, students } = db.models;

const getStudent = catchAsync(async(req, res) => {
    const data = await students.findAll();
    res.send(data);
});

const createStudent = catchAsync(async(req, res) => {
    const { roll_no, name, address, contact_number, age, gender, hostel_id } = req.body;
    const data = await students.create({ roll_no, name, address, contact_number, age, gender, hostel_id })
    res.status(201).send(data); 
});

const deleteStudent = catchAsync(async(req, res) => {
    const {id} = req.params
    const student = await students.findByPk(id);
    if(!student){
        res.sendStatus(404);
        return
    }
    await students.destroy({
        where: {
          roll_no: id,
        },
      })
    res.send({message: "deleted"}); 
});

const registerStudent = catchAsync(async(req, res) => {
    const {tournament_id, hostel_id, selectedStudents} = req.body;
    const tournament = await tournaments.findByPk(tournament_id);
    if(!tournament){
        res.sendStatus(404);
        return;
    }
    const new_array = selectedStudents.map(roll_nos => {
        return {roll_no: roll_nos}
    })
    const updatedStudents = await students.update(
        {tournament_id: tournament_id},
        {
            where:{
                [Op.or]: new_array
            }
        }
    )
    res.send(updatedStudents);
})

module.exports = {
    getStudent,
    createStudent,
    deleteStudent,
    registerStudent,
};