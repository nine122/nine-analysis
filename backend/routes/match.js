const express = require("express");
const { body } = require("express-validator");
const matchController = require("../controllers/matchController");

const router = express.Router();

// Create a new match under a round
router.post(
  "/:roundId/create-match",
  [
    body("hometeam").notEmpty(),
    body("awayteam").notEmpty(),
    body("body").notEmpty(),
    body("total").notEmpty(),
    body("probability").isArray({ min: 6 }),
    body("odds").isArray({ min: 6 }),
  ],
  matchController.createMatch
);

// Get all matches under a specific round
router.get("/:roundId", matchController.getMatchesByLeagueAndRound);

router.get("/:roundId/:matchId", matchController.detail);
router.delete("/:roundId/:matchId", matchController.deleteMatch);
router.patch("/:roundId/:matchId", matchController.editMatch);

module.exports = router;
