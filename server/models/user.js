const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [10, 150],
          msg: 'please enter a longer email address'
        }
      },
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    userFirstName: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 50],
      is: ["^[a-z]+$", "i"] 
  },
  userLastName: {
      type: DataTypes.STRING,
      required: true,
      len: [2, 50],
      is: ["^[a-z]+$", "i"] 
  },
  userPhone: {
      type: DataTypes.STRING,
      isNumeric: true 
  },
  userAddress: {
      type: DataTypes.STRING,
  },
  isChef: {
    type: DataTypes.BOOLEAN
  }

  }, {});
  //Associations create a two way connection between tables
  User.associate = function({ AuthToken, chefTable }) {
    User.hasMany(AuthToken);
    User.hasOne(chefTable);
  };

  // Class method for authentication
  User.authenticate = async function(username, password) {
    const user = await User.findOne({ where: { username }});
    // bcrypt is a one-way hashing algorithm that allows us to store strings ont he database rather than the raw passwords
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }
    throw new Error('invalid password');
  }

  // To define an instance method, we have to access User model prototype
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this

    // create a new auth token associated to 'this' user by calling the AuthToken class method
    const authToken = await AuthToken.generate(this.id);
    // addAuthToken is a generated method provided by sequelize for any 'hasMany' relationships
    await user.addAuthToken(authToken);
    return { user, authToken }
  };

  User.prototype.logout = async function (token) {
    // destroy the auth token record that matches the passed token
    sequelize.models.AuthToken.destroy({where: { token }});
  }
  return User;
};