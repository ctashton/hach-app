module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  // Associations create a two way connection between models to make queries that include the related objects
  AuthToken.associate = function(models) {
    AuthToken.belongsTo(models.User);
  };

  //generate random 15 char token and associate it with User
  AuthToken.generate = async function(UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    }
    let token = '';

    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length
        )
      );
    }
    return AuthToken.create({ token, UserId })
  }
  return AuthToken;
};