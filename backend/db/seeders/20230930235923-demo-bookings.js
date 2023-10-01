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
        startDate: '10-23-95',
        endDate: '10-25-96'

      },
      {
        spotId: 2,
        userId: 2,
        startDate: '10-24-2011',
        endDate: '12-29-2013'


      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['10-23-95','10-24-2011'] }
    }, {});

  }
};
