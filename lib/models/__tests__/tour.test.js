const Tour = require('../tour');
const { ObjectId } = require('mongoose').Types;

describe('Tour model', () => {
  it('creates a model from valid data', () => {
    const testTour = {
      title: 'Super Awesome Tour',
      activities: ['Ping pong, beach, volleyball'],
      launchDate: new Date('5/25/2020'),
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
        launchDate: expect.any(Date),
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
        "launchDate": Any<Date>,
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
