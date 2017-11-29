var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mamSchema = new Schema({
  title: {
    type:String,
    required:true
  },
  link: {
    type:String,
    required:true
  },
  note: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
  }
});

var Article = mongoose.model('makingamurderer', mamSchema);
module.exports = Article;