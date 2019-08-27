'use strict';
module.exports = (sequelize, DataTypes) => {
  const userTypeTable = sequelize.define('userTypeTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  //needs foreign key to user info
  userType: {
      type: DataTypes.STRING //we should pass in a user as default, and have them sign up to be a chef if needed
  }
  }, {});
  userTypeTable.associate = function(models) {
    // associations can be defined here
    userTypeTable.belongsTo(models.User);
  };
  
  return userTypeTable;
};