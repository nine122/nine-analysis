const express = require("express");
const { body } = require("express-validator");
const roundController = require("../controllers/roundController");

const router = express.Router();

// Get all rounds by league
router.get("/:league/:roundNumber?", roundController.getRoundsByLeague);

// Create a new round under a specific league
router.post(
  "/create-round",
  [
    body("leagueName").isIn([
      "EPL",
      "La Liga",
      "Bundesliga",
      "Serie A",
      "International",
      "UCL",
      "Others",
    ]),
    body("roundNumber"),
  ],
  roundController.createRound
);

module.exports = router;
