const express = require("express");
const router = express.Router();
const { getHostel, createHostel, hostelLogin } = require("../controllers/hostel.controller");
const  userAuth  = require("../middleware/auth");

router.get("/", userAuth,getHostel);
router.post("/", createHostel);
router.post("/login", hostelLogin);


module.exports = router;
