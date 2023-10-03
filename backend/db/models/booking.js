'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })


    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: new Date().toJSON().slice(0,10)
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {

        // afterStartDate(val){
        //   if(val < this.startDate){
        //     throw new Error('End date must be after start date')
        //   }
        // }

        // isAfter: this.startDate

      }
    }

  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Booking;
};