const { where, Op } = require("sequelize");
const db = require("../db/db");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { tournaments, students } = db.models;

const getStudent = catchAsync(async (req, res) => {
    const data = await students.findAll();
    res.send(data);
});

const createStudent = catchAsync(async (req, res) => {
    // const { roll_no, name, address, contact_number, age, gender, hostel_id } = req.body;
    // const data = await students.create({ roll_no, name, address, contact_number, age, gender, hostel_id })
    // res.status(201).send(data); 
    const { students: allStudents, hostel_id } = req.body
    const tableEntries = allStudents.map(student => {
        return {
            roll_no: student.rollNo,
            name: student.name,
            address: student.address,
            contact_number: student.contactNo,
            age: student.age,
            gender: student.gender,
            hostel_id: hostel_id,
        }
    });
    const data = await students.bulkCreate(tableEntries);
    console.log(tableEntries)
    // res.sendStatus(201);
    // return
    res.status(201).send(data);
});

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params
    const student = await students.findByPk(id);
    if (!student) {
        res.sendStatus(404);
        return
    }
    await students.destroy({
        where: {
            roll_no: id,
        },
    })
    res.send({ message: "deleted" });
});

const registerStudent = catchAsync(async (req, res) => {
    const { tournament_id, hostel_id, selectedStudents } = req.body;
    const tournament = await tournaments.findByPk(tournament_id);
    if (!tournament) {
        res.sendStatus(404);
        return;
    }
    // const junctionTable = selectedStudents.map(roll_nos => {
    //     return { student_roll_no: roll_nos, tournament_id: tournament_id }
    // })
    console.log(selectedStudents);
    // const updatedStudents = await students.update(
    //     { tournament_id: tournament_id },
    //     {
    //         where: {
    //             [Op.or]: new_array
    //         }
    //     }
    // )
    const StudentInstances = await students.findAll({
        where: {
            roll_no: {
                [Op.or]: selectedStudents
            }
        }
    })
    // let data1 = []
    // StudentInstances.forEach(async (studentInstance) => {
    //     const data = await studentInstance.addTournament(tournament)
    //     data1.push(data);
    // });
    const data = await tournament.addStudents(StudentInstances);
    res.status(201).send(data);
})


module.exports = {
    getStudent,
    createStudent,
    deleteStudent,
    registerStudent,
};