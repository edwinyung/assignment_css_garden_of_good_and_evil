"use strict";

let fs = require("fs");
let http = require("http");
let app = require("express")();

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
// var cookieSession = require("cookie-session");
//
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["asdf1234567890qwer"]
//   })
// );

// Set up handlebars
const exphbs = require("express-handlebars");
// const helpers = require("./helpers");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    // helpers: helpers.registered,
    partialsDir: "views/"
  })
);
app.set("view engine", "handlebars");

app.post("/good_evil", (req, res) => {
  console.log(req.body);;
  //res.render('index');
  res.redirect("/");
});


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, "localhost", () => {
  console.log("Listening!");
});
