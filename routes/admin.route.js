const express = require("express");
const router = express.Router();
const { createAdmin, adminLogin } = require("../controllers/admin.controller");

router.post("/", createAdmin);
router.post("/login", adminLogin)

module.exports = router;
