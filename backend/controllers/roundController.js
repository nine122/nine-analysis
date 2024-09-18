const Round = require("../models/round");

const roundController = {
  getRoundsByLeague: async (req, res) => {
    const { league, roundNumber } = req.params;
    try {
      const query = { league };

      if (roundNumber) {
        query.roundNumber = roundNumber;
      }

      const rounds = await Round.find(query).populate("matches");

      if (rounds.length === 0) {
        return res.status(404).json({ message: "No rounds found" });
      }

      return res.json(rounds);
    } catch (error) {
      console.error(error); // Log error for debugging
      return res.status(500).json({ message: "Error fetching rounds" });
    }
  },

  createRound: async (req, res) => {
    const { leagueName, roundNumber } = req.body;
    try {
      const round = new Round({ league: leagueName, roundNumber });
      await round.save();
      return res.json({
        message: `Round ${roundNumber} created in ${leagueName}`,
        round,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error creating round" });
    }
  },
};

module.exports = roundController;
