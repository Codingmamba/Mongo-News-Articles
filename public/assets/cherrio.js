let cheerio = require("cheerio");
let request = require("request");
let mongoose = require("mongoose");


// $("#scrape").on("click", function() {
//   request('https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page', function (error, response, html) {
//   let $ = cheerio.load(html);
//   let results = [];
//   // $('p.title').each(function(i, element){
//
//   //     let title = $(this).text();
//   //     let link = $(element).children().attr('href');
//
//   //     result.push({
//   //       title:title,
//   //       link:link
//   //     });
//
//       $("h2.headline").each(function(i, element) {
//           // Save the text of the h4-tag as "title"
//           var title = $(this).text();
//           // Find the h4 tag's parent a-tag, and save it's href value as "link"
//           var link = $(element).children().attr("href");
//           // Make an object with data we scraped for this h4 and push it to the results array
//           results.push({
//             title: title,
//             link: link
//           });
//
//  $("#titles").text(results);
// });
//   });
//   res.send("Scrape Complete");
// });
