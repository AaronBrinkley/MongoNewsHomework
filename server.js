require('dotenv').config()
// var methodOverride = require('method-override');
var mongoose = require("mongoose")
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var morgan = require("morgan")
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var db = require("./models");




//Heroku Test
var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  //useMongoClient: true
});

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// require("./routes/view/homeviewroute.js")(app);
// require("./routes/view/savedviewroute.js")(app);



//app.use(express.static("public"));



// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(methodOverride('_method'));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var headlineRoute = require("./controllers/headline.js");
var noteRoute = require("./controllers/note.js");
var fetchRoute = require("./controllers/fetch.js");

app.use(headlineRoute);
app.use(noteRoute);
app.use(fetchRoute);



// Require all models




// Configure middleware

// Use morgan logger for logging requests
//app.use(logger("dev"));
// Use body-parser for handling form submissions


// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB


// Routes



// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.Article.findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });


// // Route to get all User's and populate them with their notes
// app.get("/populateduser", function(req, res) {
//   // Find all users
//   db.User.find({})
//     // Specify that we want to populate the retrieved users with any associated notes
//     .populate("notes")
//     .then(function(dbUser) {
//       // If able to successfully find and associate all Users and Notes, send them back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });






// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
