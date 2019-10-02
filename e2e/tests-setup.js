const request = require('./request');

function postTour(tour) {
  return request
    .post('/api/tours')
    .send(tour)
    .expect(200)
    .then(({ body }) => {
      return body;
    });
}

function postTourStop(tourId, location) {
  return request
    .post(`/api/tours/${tourId}/stops`)
    .send(location)
    .expect(200)
    .then(({ body }) => {
      return body;
    });
}


module.exports = { postTour, postTourStop };