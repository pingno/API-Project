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
        url: 'https://i.pinimg.com/564x/69/49/37/6949379274e642d175a5ccb794aac761.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/13/a0/14/13a0146f47753e598c6b41de26d78fef.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/22/0f/1f/220f1f6c4576ebc3b5c1483a984bbdbd.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/564x/1c/13/53/1c135393d3745fb2e69b81381137c918.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/d0/d5/88/d0d588eeedcc4d2e02c22b5860751616.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/564x/3b/44/bf/3b44bfea1104a31108307d4838655b8f.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/564x/8d/b0/05/8db00504ad64d023e80d463c297cffcd.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/564x/48/0d/d6/480dd67a9838409f6e1e7b363f6651e3.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/564x/83/1f/ca/831fca80b9a615a0564b42b10a780732.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/a8/27/a6/a827a60c01cd20c41c71d9808def6ca4.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/564x/4e/ea/6c/4eea6c76591bbd8820eabf721c41397b.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/236x/21/c8/3a/21c83a46d76ffd19ffa9d64f912dd12c.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/564x/c2/87/4a/c2874a0f9892cd600ef107b3fd980976.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/564x/d8/0f/42/d80f42925c5d38cc17abdc6c8018e91c.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/originals/f4/fa/32/f4fa32740a00f6e1731026fd798daebf.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/564x/b1/06/dd/b106ddc23e022b945593202cf906e04a.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/564x/d5/3e/82/d53e82148b8fecf12dbf6a017463bbc3.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/564x/40/60/87/4060871ec0fc63878fb6d323e3d63029.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/564x/da/5f/46/da5f46da22e4a51ef49e9460c3fd589c.jpg',
        preview: false
      },

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
