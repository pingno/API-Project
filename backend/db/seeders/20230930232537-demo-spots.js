'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '4402 Muffin blvd',
        city: 'Muffin',
        state: 'Texas',
        country: 'US',
        lat: 211.23,
        lng: 354.21,
        name: 'The cool spot',
        description: 'visit but beware of coyotes',
        price: 200.26
      },
      {
        ownerId: 2,
        address: '4403 Muffin blvd',
        city: 'Muffin',
        state: 'Texas',
        country: 'US',
        lat: 21.23,
        lng: 34.21,
        name: 'The spot spot',
        description: 'beware of bears',
        price: 250.52
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['4402 Muffin Blvd', '4403 Muffin Blvd'] }
    }, {});

  }
};
