const Tour = require('../tour');
const { ObjectId } = require('mongoose').Types;

describe('Tour model', () => {
  it('creates a model from valid data', () => {
    const testTour = {
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

    const tourModel = new Tour(testTour);
    const errors = tourModel.validateSync();
    expect(errors).toBeUndefined();

    const json = tourModel.toJSON();
    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        stops: [
          {
            _id: expect.any(Object)
          }
        ]
      },
      `
      Object {
        "_id": Any<Object>,
        "activities": Array [
          "Ping pong, beach, volleyball",
        ],
        "launchDate": 2019-10-02T00:42:35.023Z,
        "stops": Array [
          Object {
            "_id": Any<Object>,
            "attendance": 2000,
            "weather": [Function],
          },
        ],
        "title": "Super Awesome Tour",
      }
    `
    );
  });
});
