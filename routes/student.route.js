const express = require("express");
const router = express.Router();
const { getStudent, createStudent, deleteStudent, registerStudent } = require("../controllers/student.controller");

router.get("/", getStudent);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.post("/register", registerStudent);

module.exports = router;
