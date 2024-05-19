const express = require("express");
const Forms = require("../db/connection");
const router = express.Router();

/* GET home page. */
router.post("/", async function (req, res, next) {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const form = await Forms.create({
      ...req.body,
      ip,
    });
    res.render("success");
  } catch (error) {
    res.render("error");
  }
});

module.exports = router;
