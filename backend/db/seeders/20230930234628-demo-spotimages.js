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
        url: 'https://i.pinimg.com/originals/83/0b/77/830b772f4ae8171f2988d490eca031f5.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/31/8a/34/318a34f0b90de3006cd3dbe627718c78.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/84/bc/a1/84bca173a72521445dc008bade976e54.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/736x/cd/75/95/cd75956130717695e6b7a5d1f567ace6.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/4b/f2/8a/4bf28af0dbff5ab7e5e4cdd9f6ce778b.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/d0/d5/88/d0d588eeedcc4d2e02c22b5860751616.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/a8/27/a6/a827a60c01cd20c41c71d9808def6ca4.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/originals/f4/fa/32/f4fa32740a00f6e1731026fd798daebf.jpg',
        preview: true
      }

      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      preview: { [Op.in]: [true, false] }
      
    }, {});

  }
};
