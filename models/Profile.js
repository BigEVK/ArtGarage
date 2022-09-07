// username and password
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
// const { mapValueFieldNames } = require('sequelize/types/utils');

// create our User model
class Profile extends Model {
}

// create fields/columns for User model
Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    snippet: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'artist',
      validate: {
        len: [1]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artwork_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    art_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'profile'
  }
);

module.exports = Profile;