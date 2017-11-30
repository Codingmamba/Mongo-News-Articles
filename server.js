// MONGODB_URI: mongodb://heroku_32w8s3fm:38jivtq4aprt9164436t9ae9rk@ds259305.mlab.com:59305/heroku_32w8s3fm

let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");
let express = require("express");
let mongojs = require("mongojs");
let bodyParser = require("body-parser");
let logger = require("morgan");
let axios = require("axios");
let path = require("path");

let PORT = process.env.PORT || 3005;

let mods = require("./models");

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news", {
  useMongoClient: true
});

let Schema = mongoose.Schema;


// Initialize Express
let app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan logger for logging requests
app.use(logger("dev"));


let db = mongoose.connection; 


// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});


app.get('/scrape', function(req, res) {
	axios.get('https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page').then(function(response) { 
		const $ = cheerio.load(response.data); 
	 
		$("div.story-body").each(function(i, element) { 
		let results = {}; 

	results.title = $(this).text(); 	
	results.link = $(element).children().attr("href"); 
  results.summary = $(this).text(); 

	 //db.Article 
		 //.create(results) 
		 //.then(function(dbArticle) { 
					
		 res.send("Scrape Complete"); 
			// }) 
		//  .catch(function(err) { 
					
		// 	 res.json(err); 
		//  });
		});
		res.send("Scrape Complete"); 
	});
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
	// Grabs every document in the Articles collection
	db.Article
	  .find({})
	  .then(function(dbArticle) {
	
		res.json(dbArticle);
	  })
	  .catch(function(err) {
		
		res.json(err);
	  });
  });
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
	
	db.Article
	  .findOne({ _id: req.params.id })

	  .populate("note")
	  .then(function(dbArticle) {

		res.json(dbArticle);
	  })
	  .catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	  });
  });
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
	// Create a new note and pass the req.body to the entry
	db.Note
	  .create(req.body)
	  .then(function(dbNote) {
		
		return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
	  })
	  .then(function(dbArticle) {
		// If we were able to successfully update an Article, send it back to the client
		res.json(dbArticle);
	  })
	  .catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	  });
  });

app.listen(PORT , function() {
  console.log('App running on port:'+ PORT);
});
