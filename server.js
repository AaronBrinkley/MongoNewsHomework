require('dotenv').config()

var mongoose = require("mongoose")
var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var morgan = require("morgan")
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var db = require("./models");





var PORT = process.env.PORT || 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  
});

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var headlineRoute = require("./controllers/headline.js");
var noteRoute = require("./controllers/note.js");
var fetchRoute = require("./controllers/fetch.js");

app.use(headlineRoute);
app.use(noteRoute);
app.use(fetchRoute);


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
