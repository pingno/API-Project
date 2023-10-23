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
        url: 'https://i.pinimg.com/originals/7b/15/88/7b15886f7f9f6605d93ef0ab24c3eda6.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/originals/e1/51/4e/e1514e6eb892d7ac8e97c63fe3014d08.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/c6/4a/c2/c64ac2d6d73554772835a1d8e14a1742.jpg',
        preview: true
      }
      
    ], { validate: true });


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://i.pinimg.com/originals/7b/15/88/7b15886f7f9f6605d93ef0ab24c3eda6.jpg','https://i.pinimg.com/originals/e1/51/4e/e1514e6eb892d7ac8e97c63fe3014d08.jpg','https://i.pinimg.com/originals/c6/4a/c2/c64ac2d6d73554772835a1d8e14a1742.jpg'] }
    }, {});

  }
};
