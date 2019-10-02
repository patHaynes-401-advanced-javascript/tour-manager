// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');
// const Stop = require('../models/stop');

router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .select('title')
      .then(tours => res.json(tours))
      .catch(next);
  })
  .post('/:id/stops', ({ params, body }, res, next) => {
    Location.addShow(params.id, body)
      .then(shows => res.json(shows))
      .catch(next);
  })

module.exports = router;