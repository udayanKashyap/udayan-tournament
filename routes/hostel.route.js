const express = require("express");
const router = express.Router();
const { getHostel, createHostel } = require("../controllers/hostel.controller");

router.get("/", getHostel);
router.post("/", createHostel);

module.exports = router;
