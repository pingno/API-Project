'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'thefirstspot.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'thesecondspot.com',
        preview: true
      },
      {
        spotId: 3,
        url: 'thethirdspot.com',
        preview: true
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['thefirstspot.com','thesecondspot.com','thethirdspot.com'] }
    }, {});

  }
};
