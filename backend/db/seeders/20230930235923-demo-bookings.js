'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '10-23-23',
        endDate: '10-27-23'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '10-31-2023',
        endDate: '11-1-2023'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '11-2-2023',
        endDate: '11-5-2023'
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['10-23-23','10-31-2023','11-2-2023'] }
    }, {});

  }
};
