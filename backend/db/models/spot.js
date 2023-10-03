'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
        // as: 'previewImage'
      })

      //belongsTo ??
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      })

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Spot.hasMany(models.Review, {
        foreignkey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })

      // //belongsToMany ??
      // Spot.belongsToMany(models.User, {
      //   through: models.Booking,
      //   foreignKey: 'spotId',
      //   otherKey: 'userId'
      // })

      // //belongsToMany ??
      // Spot.belongsToMany(models.User, {
      //   through: models.Review,
      //   foreignKey: 'spotId',
      //   otherKey: 'userId'
      // })


    }
  }
  Spot.init({
    ownerId: {
     type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      validate: {
        min: -90.0000000,
        max: 90.0000000
      }
      // allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      validate: {
        min: -180.0000000,
        max: 180.0000000
      }
      // allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"]
    //   }
    // }
  });
  return Spot;
};