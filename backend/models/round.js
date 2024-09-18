const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    league: {
      type: String,
      enum: [
        "EPL",
        "La Liga",
        "Bundesliga",
        "Serie A",
        "International",
        "UCL",
        "Others",
      ],
      required: true,
    },
    roundNumber: {
      type: String,
      required: true,
    },
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  { timestamps: true }
);

const Round = mongoose.model("Round", RoundSchema);

module.exports = Round;
