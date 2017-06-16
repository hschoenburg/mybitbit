'use strict';

var bcrypt   = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    phone_verified: DataTypes.BOOLEAN,
    facebook_id: DataTypes.STRING,
    facebook_token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Debit, { foreignKey: 'user_id' }),
        User.hasMany(models.Credit, { foreignKey: 'user_id' })
      },
    },
    instanceMethods: {
      
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.local.password);
      },
    }

  });
  return User;
};

