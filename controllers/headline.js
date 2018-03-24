var express = require("express");

var router = express.Router();


var headline = require("../models/headline.js");
var note = require("../models/note.js");





  router.get('/', function (req, res) {
    var query = headline.find({});
    query.exec(function (err, docs) {
        if (err) {
            throw Error;
        }
        res.render('index', {headline: docs});
    });
});


router.get('/saved', function (req, res) {
  var query = headline.find({});
  query.exec(function (err, docs) {
      if (err) {
          throw Error;
      }
      res.render('saved', {headline: docs});
  });
});


router.get("/headlines", function(req, res) {
 
  headline.find({})
    .then(function(dbHeadline) {
     
      res.json(dbHeadline);
    })
    .catch(function(err) {
      
      res.json(err);
    });
});



router.get("/headlines/:id", function(req, res) {
 
  headline.findOne({ _id: req.params.id })
  
    .populate("note")
    .then(function(dbHeadline) {
     
      res.json(dbHeadline);
    })
    .catch(function(err) {
      res.json(err);
    });
});



router.post("/headlines/:id", function(req, res) {
  
  note.create(req.body)
    .then(function(dbNote) {
   
      return headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbHeadline) {
     
      res.json(dbHeadline);
    })
    .catch(function(err) {
  
      res.json(err);
    });
});





router.put("/headlines/:id", function(req, res) {

  console.log(req.params.id)
  

headline.findByIdAndUpdate(  
   
    {_id: req.params.id},


     {saved: true},

    {new: true},

    
    (err, headlines) => {
    
        if (err) return res.status(500).send(err);
        res.redirect("/")
    }
)



});



router.delete("/headlines/:id", function(req, res) {
  

headline.findByIdAndRemove(req.params.id, (err, oldHeadline) => {  
   
    if (err) return res.status(500).send(err);
   
    const response = {
        message: "Headline successfully deleted",
        id: oldHeadline.id
    };
    return res.status(200).send(response);
});


});


module.exports = router;