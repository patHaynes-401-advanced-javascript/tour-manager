const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  activities: {
    type: [String],
    required: true
  },
  launchDate: {
    type: Date,
    default: new Date(),
  },
  stops: [{
    location: {
      latitude: Number,
      longitude: Number
    },
    weather: {
      type: Object,
    },
    attendance: {
      type: Number,

    }
  }]
});

module.exports = mongoose.model('Tour', schema);