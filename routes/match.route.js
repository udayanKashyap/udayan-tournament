const express = require("express");
const router = express.Router();
const { createMatches, updateWinner, getMatches } = require("../controllers/match.controller");

router.post("/create", createMatches);
router.post("/update", updateWinner);
router.get("/:tournamentId/:stage", getMatches);

module.exports = router;
