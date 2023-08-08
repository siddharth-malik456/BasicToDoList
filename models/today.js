const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoySchema = new Schema({
  title: {
    type: String, 
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  currentDate: {
    type: String,
  },
})

module.exports = mongoose.model('Today', todoySchema);
