const Match = require("../models/Match"); // Consistent naming
const Round = require("../models/round"); // Consistent naming
const mongoose = require("mongoose");

const matchController = {
  getMatchesByLeagueAndRound: async (req, res) => {
    try {
      const { roundId } = req.params;

      if (!roundId) {
        return res
          .status(404)
          .json({ msg: "Round not found for the specified league" });
      }

      // Fetch matches for the specific round
      const matches = await Match.find({ roundId }); // Consistent model usage

      return res.status(200).json(matches);
    } catch (e) {
      return res.status(500).json({ msg: "Server error" });
    }
  },

  createMatch: async (req, res) => {
    const { roundId } = req.params;
    const { hometeam, awayteam, body, total, probability, odds } = req.body;

    try {
      // Check if roundId is valid
      if (!mongoose.Types.ObjectId.isValid(roundId)) {
        return res.status(400).json({ message: "Invalid roundId" });
      }

      // Create new match
      const match = new Match({
        hometeam,
        awayteam,
        body,
        total,
        probability,
        odds,
        roundId,
      });

      await match.save();

      // Find the round by ID
      const round = await Round.findById(roundId);
      if (!round) {
        return res.status(404).json({ message: "Round not found" });
      }

      // Add match to the round's matches array
      round.matches.push(match._id); // Assuming Round schema has a `matches` array field
      await round.save();

      return res
        .status(201)
        .json({ message: "Match created successfully", match });
    } catch (error) {
      console.error(error); // Log the error to see details in the server logs
      return res
        .status(500)
        .json({ message: "Error creating match", error: error.message });
    }
  },

  detail: async (req, res) => {
    try {
      const { roundId, matchId } = req.params;

      if (!roundId) {
        return res
          .status(404)
          .json({ msg: "Round not found for the specified league" });
      }

      // Fetch matches for the specific round
      const matches = await Match.find({ roundId }); // Consistent model usage

      if (!matches) {
        return res.status(404).json({ msg: "Round not found" });
      }
      const match = matches.find((m) => m._id.toString() === matchId);
      return res.status(200).json(match);
    } catch (e) {
      return res.status(500).json({ msg: "Server error" });
    }
  },

  deleteMatch: async (req, res) => {
    try {
      const { roundId, matchId } = req.params;

      if (!roundId) {
        return res
          .status(404)
          .json({ msg: "Round not found for the specified league" });
      }

      // Fetch matches for the specific round
      const matches = await Match.find({ roundId });

      if (!matches || matches.length === 0) {
        return res.status(404).json({ msg: "Round not found" });
      }

      // Find the match within the round
      let match = matches.find((m) => m._id.toString() === matchId);

      if (!match) {
        return res.status(404).json({ msg: "Match not found" });
      }

      // Delete the match
      await Match.deleteOne({ _id: matchId });

      return res.status(200).json({
        msg: "Match deleted successfully",
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  editMatch: async (req, res) => {
    try {
      const { roundId, matchId } = req.params;
      const newmatch = req.body;

      if (!roundId) {
        return res
          .status(404)
          .json({ msg: "Round not found for the specified league" });
      }

      // Fetch matches for the specific round
      const matches = await Match.find({ roundId }); // Consistent model usage

      if (!matches || matches.length === 0) {
        return res.status(404).json({ msg: "Round not found" });
      }

      // Find the match within the round
      let match = matches.find((m) => m._id.toString() === matchId);

      if (!match) {
        return res.status(404).json({ msg: "Match not found" });
      }

      // Update the match with the new data (newmatch)
      Object.assign(match, newmatch);

      // Save the updated match
      await match.save(); // Assuming match is part of the schema (if needed, replace with the correct model call)

      return res.status(200).json({
        msg: "Match updated successfully",
        match,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = matchController;
