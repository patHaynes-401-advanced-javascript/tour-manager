const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  activities: [{
    type: String,
    required: true,
  }],
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

schema.statics = {
  addStop(id, stop) {
    return this.updateById(
      id,
      {
        $push: {
          stops: stop
        }
      }
    )
      .then(location => location.stops);
  },

  removeStop(tourId, stopId) {
    return this.updateById(tourId, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(location => location.stops);
  },

  updateAttendance(id, stopId, attendance) {
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.attendance': attendance
        }
      }
    )
      .then(location => location.stops);
  }
};


module.exports = mongoose.model('Tour', schema);