'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipeTable = sequelize.define('recipeTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  recipeName: {
    type: DataTypes.STRING,
    len: [1, 300],
    required: true
  },
  recipeDescription: {
      type: DataTypes.STRING,
      len: [1, 300],
      required: true
  },
  recipeAllergens: {
      type: DataTypes.STRING, // Convert allergens from dropdown into numbers. (ex. almonds = 1, peanuts = 2, etc. Then when checking for allergens check if number = 0 first (which would mean no allergens) to avoid checking everything else)
      required: false
  },
  recipeSiteFavorites: {
      type: DataTypes.STRING //if we add a top 5/10/15 list
  }
  }, {});
  recipeTable.associate = function(models) {
    // associations can be defined here
    recipeTable.belongsTo(models.User)
  };
  return recipeTable;
};