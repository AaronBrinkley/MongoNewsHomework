var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();


var db = require("../models/");

var headline = require("../models/headline.js");


router.get("/scrape", function(req, res) {

  request("https://www.reddit.com/", function(error, response, html) {
  
    var $ = cheerio.load(response.body);

    $(".title").each(function(i, element) {
     
      // console.log(element);
      // console.log(test)
     
      var result = {};

      
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");


         console.log(result);

     
      headline.create(result)
        .then(function(dbHeadline) {
       
          console.log(dbHeadline);
        })
        .catch(function(err) {
          
          return res.json(err);
        });
    });

     res.redirect("/");

  })

});



module.exports = router;