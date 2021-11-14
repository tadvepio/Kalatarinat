const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,  
  }
})

module.exports = mongoose.model('Entry', entrySchema)