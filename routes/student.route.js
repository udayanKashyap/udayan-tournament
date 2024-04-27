const express = require("express");
const router = express.Router();
const { getStudent, createStudent, deleteStudent } = require("../controllers/student.controller");

router.get("/", getStudent);
router.post("/", createStudent);
router.delete("/:id", deleteStudent)

module.exports = router;
