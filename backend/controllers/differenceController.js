const Differences = require("../models/Differences");
const mongoose = require("mongoose");
const differenceController = {
  index: async (req, res) => {
    let differences = await Differences.find();
    return res.json(differences);
  },
  store: async (req, res) => {
    try {
      const { hometeam, awayteam, body, total, probability, odds } = req.body;
      const difference = await Differences.create({
        hometeam,
        awayteam,
        body,
        total,
        probability,
        odds,
      });
      return res.json(difference);
    } catch (e) {
      return res.status(400).json({ msg: "invalid fields" });
    }
  },

  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let match = await Differences.findById(id);
      if (!match) {
        return res.status(404).json({ msg: "id not found" });
      }
      return res.json(match);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let match = await Differences.findByIdAndDelete(id);
      if (!match) {
        return res.status(404).json({ msg: "id not found" });
      }
      return res.json(match);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let match = await Differences.findByIdAndUpdate(id, {
        ...req.body,
      });
      if (!match) {
        return res.status(404).json({ msg: "id not found" });
      }
      return res.json(match);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
};

module.exports = differenceController;
