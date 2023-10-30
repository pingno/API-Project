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
      {
        spotId: 5,
        url: 'https://i.pinimg.com/564x/e7/b8/c2/e7b8c28076bf2174f8464eee43df3d5d.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/564x/e2/d1/28/e2d128a43069d381060c93d1269f0277.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/564x/63/35/1e/63351e6a7d7e43fbde03cf55dcd00648.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/564x/33/3e/39/333e392bdf84cd44407e4238a7993d16.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/564x/5a/94/15/5a9415ec68fa63adc58f215bd37927fb.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/564x/01/af/43/01af43b3b625f2802f3bdec8ba0b8658.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/564x/79/ca/af/79caafd3b0a27faaa59bed817199e472.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/564x/e2/fb/0a/e2fb0af31c456cbe3be947f5bc5f800a.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/564x/3d/ce/78/3dce787528a744ce9b86bdcbf7a7261a.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/564x/e0/e9/e1/e0e9e10184d8a1928808e33c9411a501.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/ef/8c/f8/ef8cf83bc968b18fbbaa735c23debe11.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/3f/99/4e/3f994eab657510bc409512aedd05670d.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/45/44/19/454419c82ba1b9498df781745b4fa5d3.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/bf/e6/50/bfe65070e7086b2351e7d96ff44c5c04.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/564x/3d/05/fe/3d05fec42f041417de209eff16fd018a.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/e7/0b/72/e70b72607844655dbe489c6005ac8560.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/f7/b8/99/f7b8999a4cbdfdb6f57a6711f2221328.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/d1/04/9f/d1049fe322ee4061e0d9d086d5e64e96.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/54/ea/f6/54eaf66e6d6d0114639a3d913c81992d.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/8d/ae/80/8dae80e777fdc9692d8b3aa3910f6ce1.jpg',
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
