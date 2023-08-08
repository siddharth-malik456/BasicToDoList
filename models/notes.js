const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  dateCreated: {
    type: String,
    required: true,
  },

})

module.exports = mongoose.model('Note', noteSchema);