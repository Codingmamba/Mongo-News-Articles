# Mongo-News-Articles
Will be using MongoDB, Mongoose, Cheerio, and Node.js


In this assignment, you'll create a <b>web app</b> that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your <b>Mongoose</b> and <b>Cheerio</b> muscles to scrape news from another site.

In order to deploy your project to Heroku, you must set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running.

Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article.

Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.
