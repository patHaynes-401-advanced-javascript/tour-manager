// const request = require('../request');
const db = require('../db');
const { postTour } = require('../tests-setup');
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
          "launchDate": "2019-10-02T00:42:35.484Z",
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

//   it.skip('gets a tour by id', () => {
//     return postTour(epicTour).then(tour => {
//       return request
//         .get(`/api/tours/`)
//         .expect(200)
//         .then(({ body }) => {
//           expect(body).toMatchInlineSnapshot(
//             [
//               {
//                 _id: expect.any(String)
//               }
//             ],
//             `
//             Object {
//               "0": Object {
//                 "_id": "5d93e2df017da11ae9d48a13",
//                 "title": "Super Awesome Tour",
//               },
//             }
//           `
//           );
//         });
//     });
//   });
// });
