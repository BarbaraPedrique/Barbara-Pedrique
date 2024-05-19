const express = require("express");
const Forms = require("../db/connection");

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const forms = await Forms.findAll();
  res.render("contact-list", { forms });
});

module.exports = router;
