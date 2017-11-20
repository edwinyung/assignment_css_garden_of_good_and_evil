"use strict";

let fs = require("fs");
let http = require("http");
const express = require("express");
const app = express();

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
var cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["asdf1234567890qwer"]
  })
);

app.use(express.static(`${__dirname}/public`));

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
  let favorites = {};

  favorites.good_evil = req.body.good_evil || req.cookies.favorites.good_evil;
  favorites.food = req.body.food || req.cookies.favorites.food;
  favorites.colors = req.body.colors || req.cookies.favorites.colors;
  favorites.slider = req.body.slider || req.cookies.favorites.slider;
  res.cookie("favorites", favorites);
  res.redirect("/");
});

app.get("/", (req, res) => {
  let favorites = req.cookies.favorites;
  res.render("index", { favorites });
});

app.listen(3000, "localhost", () => {
  console.log("Listening!");
});
