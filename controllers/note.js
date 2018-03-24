var express = require("express");

var router = express.Router();


var note = require("../models/note.js");



router.get("/notes", function(req, res) {
 
note.find((err, notes) => {  
    
    if (err) return res.status(500).send(err)
   
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
    
    req.params.noteId,

    
    req.body,

 
    {new: true},

    
    (err, notes) => {
    
        if (err) return res.status(500).send(err);
        return res.send(notes);
    }
)


});



router.delete("/notes/:id", function(req, res) {
  

note.findByIdAndRemove(req.params.noteId, (err, todo) => {  
    
    if (err) return res.status(500).send(err);
   
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});


});


module.exports = router;