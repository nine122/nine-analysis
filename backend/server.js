const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");

const roundRoutes = require("./routes/round");
const matchRoutes = require("./routes/match");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const mongoURL =
  "mongodb+srv://neskokaung122:mym1234@mymcluster.fxk5q.mongodb.net/?retryWrites=true&w=majority&appName=MYMcluster"; // MongoDB URL
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is listening on " + process.env.PORT);
  });
});

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/rounds", roundRoutes);
app.use("/api/matches", matchRoutes);

console.log(process.env.PORT);
