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
        lat: 12.2323453,
        lng: 56.2123455,
        name: 'The cool spot',
        description: 'visit but beware of coyotes',
        price: 200
      },
      {
        ownerId: 2,
        address: '4403 Muffin blvd',
        city: 'Muffin',
        state: 'Texas',
        country: 'US',
        lat: 21.2354545,
        lng: 34.2154545,
        name: 'The spot spot',
        description: 'beware of bears',
        price: 250
      },
      {
        ownerId: 3,
        address: '2929 Crossy road',
        city: 'Chicken',
        state: 'Alabama',
        country: 'US',
        lat: 54.2453545,
        lng: 78.2154545,
        name: 'The third spot',
        description: 'you shall not pass',
        price: 266
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['4402 Muffin blvd', '4403 Muffin blvd', '2929 Crossy road'] }
    }, {});

  }
};
