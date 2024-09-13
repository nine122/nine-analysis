const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DifferencesSchema = new Schema(
  {
    hometeam: {
      type: String,
      required: true,
    },
    awayteam: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    probability: {
      type: [Number], // Array of numbers
      required: true,
    },
    odds: {
      type: [Number], // Array of numbers
      required: true,
    },
  },
  { timestamps: true }
);

const Differences = mongoose.model("Difference", DifferencesSchema);

module.exports = Differences;
