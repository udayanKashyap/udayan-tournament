const express = require("express");
const router = express.Router();
const { createTournament, getTournaments, getTournamentsOfHostel, getTournamentParticipants } = require("../controllers/tournament.controller");
const { hostelUserAuth, adminUserAuth } = require("../middleware/auth");


router.get("/", getTournaments);
router.get("/participants", getTournamentParticipants);
router.post("/", adminUserAuth, createTournament);
router.get("/hostel/:hostelId", hostelUserAuth, getTournamentsOfHostel);

module.exports = router;