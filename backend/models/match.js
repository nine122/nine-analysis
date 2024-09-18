const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema(
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
    roundId: { type: Schema.Types.ObjectId, ref: "Round", required: true },
    result: {
      type: String,
      required: false,
    },
    iswon: {
      type: Boolean,
      requird: false,
    },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
