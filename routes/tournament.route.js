const express = require("express");
const router = express.Router();
const { createTournament, getTournaments, getTournamentsOfHostel } = require("../controllers/tournament.controller");
const { hostelUserAuth } = require("../middleware/auth");


router.get("/", getTournaments);
router.post("/", createTournament);
router.get("/:hostelId", hostelUserAuth, getTournamentsOfHostel);

module.exports = router;