var express = require("express");

var router = express.Router();


var note = require("../models/note.js");



router.get("/notes", function(req, res) {
 
note.find((err, notes) => {  
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all people
    return res.status(200).send(notes);
});


});



router.post("/notes", function(req, res) {
  
const newnote = new note(req.body);  
newnote.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newnote);
})


});



router.put("/notes/:id", function(req, res) {
  

note.findByIdAndUpdate(  
    // the id of the item to find
    req.params.noteId,

    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,

    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},

    // the callback function
    (err, notes) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(notes);
    }
)


});



router.delete("/notes/:id", function(req, res) {
  

note.findByIdAndRemove(req.params.noteId, (err, todo) => {  
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});


});


module.exports = router;