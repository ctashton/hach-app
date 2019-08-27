'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookingTable = sequelize.define('bookingTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: { 
      type: DataTypes.STRING,
    },
    username: { 
      type: DataTypes.STRING,
    },
    password: { 
      type: DataTypes.STRING
    },
    bookingTime: {
      type: DataTypes.STRING, // not sure how the calander will pass info, assuming string date for now
      required: true
    },
    bookingEventType: {
      type: DataTypes.STRING,
      required: true,
      is: ["^[a-z]+$", "i"] // will only allow letters
    },
    bookingNumPeople: {
      type: DataTypes.INTEGER,
      required: true
    },
    bookingRecipesOrder: {
      type: DataTypes.STRING, //will require foreign key or to be passed in as strings
    },
    bookingLocation: {
      type: DataTypes.STRING //assuming address. Use one stored in users unless otherwise specified
    },
    bookingSpecialrequests: {
      type: DataTypes.STRING
    },
    //USE STORED UNLESS SPECIFIED
    bookingStove: {
      type: DataTypes.STRING, //Making this string rather than Boolean so that we can pass in the type of grill
      is: ["^[a-z]+$", "i"] // will only allow letters
    },
    bookingGrill: {
      type: DataTypes.STRING,
      is: ["^[a-z]+$", "i"] // will only allow letters
    },
    bookingOven: {
      type: DataTypes.BOOLEAN,
      is: ["^[a-z]+$", "i"] // will only allow letters
    },
    bookingMicrowave: {
      type: DataTypes.BOOLEAN,
      is: ["^[a-z]+$", "i"] // will only allow letters
    },
    bookingSink: {
      type: DataTypes.BOOLEAN,
      is: ["^[a-z]+$", "i"] // will only allow letters
    }
  }, {});
  bookingTable.associate = function(models) {
    // associations can be defined here
  };
  return bookingTable;
};
