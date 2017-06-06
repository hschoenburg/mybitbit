'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipient = sequelize.define('Recipient', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    email_verif: DataTypes.BOOLEAN,
    phone_verif: DataTypes.BOOLEAN,
    sender_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Recipient.belongsTo(models.User, {foreignKey: 'sender_id'}),
        Recipient.hasMany(models.Verif, {foreignKey: 'recipient_id'})
      }
    }
  });
  return Recipient;
};
