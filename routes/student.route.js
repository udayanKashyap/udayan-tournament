const express = require("express");
const router = express.Router();
const { getStudent, createStudent } = require("../controllers/student.controller");

router.get("/", getStudent);
router.post("/", createStudent);

module.exports = router;
