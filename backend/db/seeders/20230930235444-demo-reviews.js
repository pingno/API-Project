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
        stars: 3

      },
      {
        spotId: 2,
        userId: 2,
        review: 'this place is ghetto',
        stars: 2
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['this place is ratchet','this place is ghetto'] }
    }, {});

  }
};
