'use strict';
module.exports = (sequelize, DataTypes) => {
  const genericUserTable = sequelize.define('genericUserTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  userFirstName: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 50],
      is: ["^[a-z]+$", "i"] // will only allow letters
  },
  userLastName: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 50],
      is: ["^[a-z]+$", "i"] // will only allow letters
  },
  userPhone: {
      type: DataTypes.STRING,
      isNumeric: true          // will only allow numbers
  },
  userAddress: {
      type: DataTypes.STRING
  }
  }, {});
  genericUserTable.associate = function(models) {
    // associations can be defined here
  };
  return genericUserTable;
};