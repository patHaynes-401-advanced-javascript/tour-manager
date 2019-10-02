jest.mock('../../lib/services/maps-api');
const request = require('../request');
const db = require('../db');
const { postTour, postTourStop } = require('../tests-setup');
// const { ObjectId } = require('mongoose').Types;
const getLocation = require('../../lib/services/maps-api');

getLocation.mockResolvedValue({
  latitude: 45.5266975,
  longitude: -122.6880503
});

describe('tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });
  const epicTour = {
    title: 'Super Awesome Tour',
    activities: ['Ping pong, beach, volleyball'],
    stops: []
  };

  const firstStop = {
    address: 'alchemy code lab'
  };

  const attendanceAtShow = {
    attendance: 200
  };

  it('posts a tour', () => {
    return postTour(epicTour).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          launchDate: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Array [
            "Ping pong, beach, volleyball",
          ],
          "launchDate": Any<String>,
          "stops": Array [],
          "title": "Super Awesome Tour",
        }
      `
      );
    });
  });

  it('gets a tour by id', () => {
    return postTour(epicTour).then(tour => {
      return request
        .get(`/api/tours/${tour._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              launchDate: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "activities": Array [
                "Ping pong, beach, volleyball",
              ],
              "launchDate": Any<String>,
              "stops": Array [],
              "title": "Super Awesome Tour",
            }
          `
          );
        });
    });
  });
  it('deletes a tour by id', () => {
    return postTour(epicTour).then(tour => {
      return request
        .delete(`/api/tours/${tour._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              launchDate: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "activities": Array [
                "Ping pong, beach, volleyball",
              ],
              "launchDate": Any<String>,
              "stops": Array [],
              "title": "Super Awesome Tour",
            }
          `
          );
        });
    });
  });

  it('adds a stop to a tour', () => {
    return postTour(epicTour)
      .then(tour => {
        return postTourStop(tour._id, firstStop);
      })
      .then(body => {
        expect(body[0]).toMatchInlineSnapshot(`
          Object {
            "_id": "5d95177d090dbb13ba88b145",
            "location": Object {
              "latitude": 45.5266975,
              "longitude": -122.6880503,
            },
          }
        `);
      });
  });

  it('removes a stop', () => {
    return postTour(epicTour).then(tour => {
      return postTourStop(tour._id, firstStop).then(res => {
        return request
          .delete(`/api/tours/${tour._id}/stops/${res[0]._id}`)
          .expect(200)
          .then(res => {
            console.log(res.body);
            return request
              .get(`/api/tours/${tour._id}`)
              .expect(200)
              .then(res => {
                expect(res.body.stops.length).toBe(0);
              });
          });
      });
    });
  });

  it('updates the attendance for a stop on the tour', () => {
    return postTour(epicTour).then(tour => {
      return postTourStop(tour._id, firstStop).then(res => {
        return request
          .put(`/api/tours/${tour._id}/stops/${res[0]._id}/attendance`)
          .send(attendanceAtShow)
          .expect(200)
          .then(res => {
            expect(res.body[0].attendance).toBe(200);
          });
      });
    });
  });
});
