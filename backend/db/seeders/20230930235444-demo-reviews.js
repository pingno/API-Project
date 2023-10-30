'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'If I could live here forever I would.',
        stars: 4

      },
      {
        spotId: 2,
        userId: 3,
        review: 'This was a wonderful place to stay, highly recommend.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: 'I could stay here forever.',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'The stay was like a dream.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Best vacation spot ever!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: '10/10 Highly recommend!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 4,
        review: 'Would love to visit here again',
        stars: 4
      },
      {
        spotId: 7,
        userId: 1,
        review: 'Never been so relaxed',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'If only I had booked longer!',
        stars: 4
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8] }
    }, {});

  }
};
