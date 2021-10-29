const { delegateToSchema } = require('graphql-tools')
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true, 
  },
  equipment: {
    type: Array,
    required: true,   
  },
  catchedFish: {
    type: Array,
    required: true,  
  },
  weather: {
    type: String,
    required: true,  
  }
})

module.exports = mongoose.model('Entry', entrySchema)