const request = require('../request');
const db = require('../db');
const { postTour, postTourStop } = require('../tests-setup');
const { ObjectId } = require('mongoose').Types;

describe('tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });
  const epicTour = {
    title: 'Super Awesome Tour',
    activities: ['Ping pong, beach, volleyball'],
    stops: [
      {
        location: {},
        weather: ObjectId,
        attendance: 2000
      }
    ]
  };

  const firstStop = {
    latitude: 46,
    longitude: 120
  };

  it('posts a tour', () => {
    return postTour(epicTour).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          stops: [
            {
              _id: expect.any(String)
            }
          ]
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Array [
            "Ping pong, beach, volleyball",
          ],
          "launchDate": "2019-10-02T17:08:37.596Z",
          "stops": Array [
            Object {
              "_id": Any<String>,
              "attendance": 2000,
            },
          ],
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
              stops: [
                {
                  _id: expect.any(String)
                }
              ]
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "activities": Array [
                "Ping pong, beach, volleyball",
              ],
              "launchDate": "2019-10-02T17:08:37.596Z",
              "stops": Array [
                Object {
                  "_id": Any<String>,
                  "attendance": 2000,
                },
              ],
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
              stops: [
                {
                  _id: expect.any(String)
                }
              ]
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "activities": Array [
                "Ping pong, beach, volleyball",
              ],
              "launchDate": "2019-10-02T17:08:37.596Z",
              "stops": Array [
                Object {
                  "_id": Any<String>,
                  "attendance": 2000,
                },
              ],
              "title": "Super Awesome Tour",
            }
          `
          );
        });
    });
  });

  it.skip('adds a stop to a tour', () => {
    return postTour(epicTour)
      .then(tour => {
        return postTourStop(tour._id, firstStop);
      })
      .then(([, stops]) => {
        expect(stops[0]).toMatchInlineSnapshot();
      });
  });
});
