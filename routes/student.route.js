const express = require("express");
const router = express.Router();
const { getStudent, createStudent, deleteStudent, registerStudent } = require("../controllers/student.controller");
const { hostelUserAuth } = require("../middleware/auth");


router.get("/", getStudent);
router.post("/", hostelUserAuth, createStudent);
router.delete("/:id", hostelUserAuth, deleteStudent);
router.post("/register", hostelUserAuth, registerStudent);

module.exports = router;
