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
        review: 'this place is ratchet',
        stars: 4

      },
      {
        spotId: 2,
        userId: 2,
        review: 'this place is ghetto',
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: 'this place is pretty nice',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'do not come here',
        stars: 5
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['this place is ratchet','this place is ghetto', 'this place is pretty nice', 'do not come here'] }
    }, {});

  }
};
