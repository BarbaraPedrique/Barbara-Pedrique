const express = require("express");
const { Forms, Users } = require("../db/connection");

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
    }
    const forms = await Forms.findAll();
    console.log(await Users.findAll());
    res.render("contact-list", { forms, logged: req.session.isLoggedIn });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
