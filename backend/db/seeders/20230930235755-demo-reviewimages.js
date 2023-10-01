'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'thefirstReviewImage.com',

      },
      {
        reviewId: 2,
        url: 'theSecondReviewImage.com',

      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['thefirstReviewImage.com','theSecondReviewImage.com'] }
    }, {});

  }
};
