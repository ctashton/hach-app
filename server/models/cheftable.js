'use strict';
module.exports = (sequelize, DataTypes) => {
  const chefTable = sequelize.define('chefTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  chefQualifications: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 500]
  },
  chefBio: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 3000]
  },
  chefLocation: {
      type: DataTypes.STRING,
      required: true,
      len:[2, 100]
  },
  chefRate: {
      type: DataTypes.INTEGER // this will be the 1-5 $ estimate. We'll store it as a INT and convert it using javascript to stars or whatever
  },
  chefAvailableBoolean: {
      type: DataTypes.BOOLEAN, //On/off switch for our database.
  },
  chefFullAvailability: {
      type: DataTypes.STRING // Not sure how google Calendar handles storage. For the sake of having it for now, I've put this in. We'll almost certainly need to change this to accept/format the input correctly
  },
  chefProfilePictureURL: {
      type: DataTypes.STRING, //not sure how we're storing images, so for now I'm assuming we pass in an image URL of an image hosted elsewhere
      isUrl: true
  }
  }, {});
  chefTable.associate = function(models) {
    // associations can be defined here
    chefTable.belongsTo(models.User)
  };
  return chefTable;
};