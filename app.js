var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contactRouter = require("./routes/contact");
var contactListRouter = require("./routes/contact-list");
var loginRouter = require("./routes/login");

require("dotenv").config();
var apiForm = require("./api/form");
var apiLogin = require("./api/login");

var app = express();
// view engine setup

app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret", // Cambia esto por una clave aleatoria y segura
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contact", contactRouter);
app.use("/contact-list", contactListRouter);
app.use("/login", loginRouter);

//api
app.use("/api/form", apiForm);
app.use("/api", apiLogin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(async function (req, res, next) {});
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
