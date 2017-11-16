let cheerio = require("cheerio");
let request = require("request");
let express = require("express");

// Database configuration
let databaseUrl = "cheerio";
let collections = ["scraper"];

let db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

request("https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page", function(error, response, html) {
    // Load the body of the HTML into cheerio
    var $ = cheerio.load(html);
    // Empty array to save our scraped data
    var results = [];
    // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
    $("h2.headline").each(function(i, element) {
      // Save the text of the h4-tag as "title"
      var title = $(element).text();
      // Find the h4 tag's parent a-tag, and save it's href value as "link"
      var link = $(element).parent().attr("href");
      // Make an object with data we scraped for this h4 and push it to the results array
      results.push({
        title: title,
        link: link
      });
    });
    // After looping through each h4.headline-link, log the results
    console.log(results);
  });