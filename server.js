// MONGODB_URI: mongodb://heroku_32w8s3fm:38jivtq4aprt9164436t9ae9rk@ds259305.mlab.com:59305/heroku_32w8s3fm

let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");
let express = require("express");
let mongojs = require("mongojs");
let bodyParser = require("body-parser");
let logger = require("morgan");

let PORT = 3000;
let Schema = mongoose.Schema;


// Initialize Express
let app = express();


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });