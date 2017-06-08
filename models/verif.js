'use strict';
module.exports = function(sequelize, DataTypes) {
  var Verif = sequelize.define('Verif', {
    recipient_id: DataTypes.INTEGER,
    method: DataTypes.STRING,
    sent_at: DataTypes.DATE,
    code: DataTypes.STRING,
    redeemed: DataTypes.BOOLEAN
  }, {
    classMethods: {
        // associations can be defined here
      associate: function(models) {
        // associations can be defined here
        Verif.belongsTo(models.Recipient, { foreignKey: 'recipient_id' })
      }
    }
  });
  return Verif;
};
