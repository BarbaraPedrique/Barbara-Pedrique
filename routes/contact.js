const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const recaptchaToken = process.env.RECAPTCHA_SECRET;
  res.render("contact", { recaptchaToken });
});

module.exports = router;
