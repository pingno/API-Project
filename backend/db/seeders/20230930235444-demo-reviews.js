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
        userId: 1,
        review: 'If I could live here forever I would.',
        stars: 4

      },
      {
        spotId: 2,
        userId: 2,
        review: 'This was a wonderful place to stay, highly recommend.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'I could stay here forever.',
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: 'The stay was like a dream.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Best vacation spot ever!',
        stars: 5
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4] }
    }, {});

  }
};
