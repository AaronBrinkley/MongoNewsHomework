var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var HeadlineSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },

  saved : {
    type: Boolean,
    default: false
},
  
  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
  }

});


var Headline = mongoose.model("headline", HeadlineSchema);


module.exports = Headline;
