const express = require("express");
const router = express.Router();
const { getHostel, createHostel, hostelLogin } = require("../controllers/hostel.controller");
const hostelUserAuth = require("../middleware/auth");

router.get("/", getHostel);
router.post("/", createHostel);
router.post("/login", hostelLogin);


module.exports = router;
