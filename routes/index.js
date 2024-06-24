var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    res.render("index", { logged: req.session.isLoggedIn });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
