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
        address: '723 Wano',
        city: 'Okinawa',
        state: 'Toyonaka',
        country: 'JP',
        lat: 35.6323453,
        lng: 36.2123455,
        name: 'Rokko House',
        description: 'Japanese architect Yo Shimada designed the Rokko house with a strategy of minimizing physical impacts on the environment while maintaining commanding views of Kobe. Positioned on Mt. Rokko, the home sits on a steep slope, and requires special construction techniques. The Rokko house features a transparent ground floor with a more private second floor. Connecting the home to nature, a common practice of Japanese architecture, Shimada allows residents and visitors to fully enjoy the environment. ',
        price: 75
      },
      {
        ownerId: 2,
        address: '212 Sabaody',
        city: 'Shinjuku',
        state: 'Kyoto',
        country: 'JP',
        lat: 21.2354545,
        lng: 34.2154545,
        name: 'Ikema House',
        description: 'The Okinawa Vacation House, developed by Taishi Kanemura from Pawson’s London office, was designed for a family wanting to escape their busy lives in Tokyo. The interior layout and exterior shape of the house were influenced by the site’s catenary curve. Three intersecting masses house separate functions, from single-story living spaces to double-story bedrooms. The diagonal footprint of the site funnels sightlines to the ocean and provides privacy for the family. A minimal interior blends English and Japanese architecture for a clean and relaxing escape.',
        price: 250
      },
      {
        ownerId: 3,
        address: '239 Raftel',
        city: 'Ryokugyu',
        state: 'Kobe',
        country: 'JP',
        lat: 40.2453545,
        lng: 39.2154545,
        name: 'Sakaushi House',
        description: 'Architect Taku Sakaushi designed this 50 square meter home for himself and his wife in Tokyo’s Shinjuku district. With planning regulations and restrictions, the Sakaushi house was limited to three levels. Working within his constraints, Sakaushi displays modern Japanese architecture by moving the living space to the upper floor and the work/study room to the middle level. Comfortability and the concept of leisure through the house resulted in a pause-and-go structure of stairs, creating interesting sightlines of “scenery.” ',
        price: 90
      },
      {
        ownerId: 2,
        address: '529 Laugh Tale',
        city: 'Kiyoshi',
        state: 'Kyoto',
        country: 'JP',
        lat: 46.2453545,
        lng: 88.2154545,
        name: 'Kame House',
        description: 'Designed for a couple and their young children, 07BEACH took the opportunity to use an open plan for simplicity and for the sake of keeping an eye on the kids. The House in Kyoto is timber-clad and includes a tatami mat room on the first floor, paying respect to a major characteristic in Japanese architecture. To add a sentimental touch, 07BEACH placed a young tree within the double-height living room to grow alongside the children throughout the years.” ',
        price: 200
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['723 Wano', '212 Sabaody', '239 Raftel', '529 Laugh Tale'] }
    }, {});

  }
};
