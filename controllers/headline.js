var express = require("express");

var router = express.Router();


var headline = require("../models/headline.js");
var note = require("../models/note.js");


// router.get("/", function(req, res) {
 
//   headline.find((err, headlines) => {  

//    console.log(headlines)
    
//       if (err) return res.status(500).send(err)
    
//       return res.render("index", headlines);
      
//   });
  
//   })


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


// router.get('/', function(req, res, next) {
//   res.render('index', {
//     title: 'Home',
//     page: 'home'
//   });
// });


// router.get('/register', Helpers.checkNotAuth, function(req, res) {
//   res.render('register', {});
// });


// router.get("/saved", function(req, res) {
 
// headline.find((err, headlines) => {  
 
//     if (err) return res.status(500).send(err)
  
//     return res.render("saved", headlines);
    
// });


// });



// Route for getting all Articles from the db
router.get("/headlines", function(req, res) {
  // Grab every document in the Articles collection
  headline.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// router.post("/headlines", function(req, res) {
  
// const newHeadline = new headline(req.body);  
// newHeadline.save(err => {  
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(newHeadline);
// })



// });








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








// router.put("/headlines/:id", function(req, res) {
  

// headline.findByIdAndUpdate(  
//     // the id of the item to find
//     req.params.headlineId,

//     // the change to be made. Mongoose will smartly combine your existing 
//     // document with this change, which allows for partial updates too
//     req.body,

//     // an option that asks mongoose to return the updated version 
//     // of the document instead of the pre-updated one.
//     {new: true},

//     // the callback function
//     (err, headlines) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.send(headlines);
//     }
// )



// });




router.put("/headlines/:id", function(req, res) {

  console.log(req.params.id)
  

headline.findByIdAndUpdate(  
    // the id of the item to find
    {_id: req.params.id},

    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
     {saved: true},

    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},

    // the callback function
    (err, headlines) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        res.redirect("/")
    }
)



});



router.delete("/headlines/:id", function(req, res) {
  

headline.findByIdAndRemove(req.params.id, (err, oldHeadline) => {  
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Headline successfully deleted",
        id: oldHeadline.id
    };
    return res.status(200).send(response);
});


});


module.exports = router;