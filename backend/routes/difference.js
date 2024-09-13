const express = require("express");
const { body } = require("express-validator");
const dC = require("../controllers/differenceController");
const handleErrorMsg = require("../middlewares/handleErrorMsg");

const router = express.Router();

router.get("", dC.index);

router.post(
  "",
  [
    body("hometeam").notEmpty(),
    body("awayteam").notEmpty(),
    body("body").notEmpty(),
    body("total").notEmpty(),
    body("probability").notEmpty().isArray({ min: 6 }),
    body("odds").notEmpty().isArray({ min: 6 }),
  ],
  handleErrorMsg,
  dC.store
);

router.get("/:id", dC.show);

router.delete("/:id", dC.destroy);

router.patch("/:id", dC.update);

module.exports = router;
