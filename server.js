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

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


// Initialize Express
let app = express();
app.use(express.static("public"));

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
    res.sendFile("index.html");
  });


app.get("/all", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.animals.find({}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });


app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });