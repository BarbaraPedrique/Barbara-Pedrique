var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contactRouter = require("./routes/contact");
var contactListRouter = require("./routes/contact-list");
require("dotenv").config();
var apiForm = require("./api/form");

var app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Ruta a la que Google redirigirá después de la autenticación
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("aaaaaaaaaaaaaaaaaaa");
    }
  )
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contact", contactRouter);
app.use("/contact-list", contactListRouter);
app.use("/api/form", apiForm);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/contact-list", // Ruta a la que redirigir después de la autenticación exitosa
    failureRedirect: "/", // Ruta a la que redirigir en caso de error
  })
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
