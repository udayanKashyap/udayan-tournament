const express = require("express");
const router = express.Router();
const { createTournament, getTournaments } = require("../controllers/tournament.controller")

router.get("/", getTournaments );
router.post("/", createTournament);

module.exports = router;