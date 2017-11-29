// MONGODB_URI: mongodb://heroku_32w8s3fm:38jivtq4aprt9164436t9ae9rk@ds259305.mlab.com:59305/heroku_32w8s3fm

let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");
let express = require("express");
let mongojs = require("mongojs");
let bodyParser = require("body-parser");
let logger = require("morgan");
let path = require("path");
let js = require('./public/assets/cherrio.js');

let Note = require('./models/note.js');
let Article = require('./models/article.js');

var PORT = process.env.PORT || 3005;
let Schema = mongoose.Schema;

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


// Initialize Express
let app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

let db = mongoose.connection;

db.on('error', function (err) {
console.log('Mongoose Error: ', err);
});

db.once('open', function () {
console.log('Mongoose connection successful.');
});


// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});


app.get('/scrape', function(req, res) {
	request('https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page', function (error, response, html) {
  let $ = cheerio.load(html);
  let results = [];
  // $('p.title').each(function(i, element){

  //     let title = $(this).text();
  //     let link = $(element).children().attr('href');

  //     result.push({
  //       title:title,
  //       link:link
  //     });

      $("div.story-body").each(function(i, element) {
          // Save the text of the h4-tag as "title"
          var title = $(this).text();
          // Find the h4 tag's parent a-tag, and save it's href value as "link"
          var link = $(element).children().attr("href");
          // Make an object with data we scraped for this h4 and push it to the results array
          var summary = $(this).text();
          results.push({
            title: title,
            link: link,
            summary: summary
          });

		 console.log(results);
		 
			for (let i = 0; i < results.length; i++) {

				var html;
			  
				html += "<h1>" + results[i].title + "</h1>";
				html += "<a href=" + results[i].link + "</a>";
				html += "<p>" + results[i].title + "</p>";
	
				}	
					
});
  });
  $("#titles").html(html);
});


app.get('/articles', function(req, res){
	Article.find({}, function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});


app.get('/articles/:id', function(req, res){
	Article.findOne({'_id': req.params.id})
	.populate('note')
	.exec(function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});


app.post('/articles/:id', function(req, res){
	let newNote = new Note(req.body);

	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
			.exec(function(err, doc){
				if (err){
					console.log(err);
				} else {
					res.send(doc);
				}
			});

		}
	});
});

app.listen(PORT , function() {
  console.log('App running on port:'+ PORT);
});
