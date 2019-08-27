'use strict';
module.exports = (sequelize, DataTypes) => {
  const reviewTable = sequelize.define('reviewTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  reviewChefContent: { 
      type: DataTypes.STRING,
      required: true,
      is: ["^[a-z]+$", "i"] // will only allow letters
  },
  reviewRecipeContent: { 
      type: DataTypes.STRING,
      required: true,
      is: ["^[a-z]+$", "i"] // will only allow letters
  },
  reviewChef: {
      type: DataTypes.INTEGER //1-5 from dropdown or star click or w/e
  },
  reviewRecipe: {
      type: DataTypes.INTEGER //1-5
  }
  }, {});
  reviewTable.associate = function(models) {
    // associations can be defined here
  };
  return reviewTable;
};