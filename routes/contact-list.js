const express = require("express");
const passport = require("passport");
const Forms = require("../db/connection");

const router = express.Router();

/* GET home page. */
router.get(
  "/",
  passport.authenticate("google"),
  async function (req, res, next) {
    const forms = await Forms.findAll();
    res.render("contact-list", { forms });
  }
);

module.exports = router;
