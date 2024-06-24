const express = require("express");
const { Users } = require("../db/connection");

const router = express.Router();

/* GET home page. */
router.post("/login", async function (req, res, next) {
  try {
    const user = await Users.findOne({
      where: {
        user: req.body.user,
        password: req.body.password,
      },
    });
    if (user) {
      req.session.isLoggedIn = true; // Establecer la sesión
      req.session.user = user;
      res.redirect("/contact-list");
    }
    return res.render("error");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

router.get("/logout", async function (req, res, next) {
  try {
    req.session.isLoggedIn = false; // Establecer la sesión
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

module.exports = router;
