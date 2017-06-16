'use strict';
module.exports = function(sequelize, DataTypes) {
  var Verif = sequelize.define('Verif', {
    user_id: DataTypes.INTEGER,
    method: DataTypes.STRING,
    sent_at: DataTypes.DATE,
    code: DataTypes.STRING,
    // TODO make this false by default
    redeemed: DataTypes.BOOLEAN
  }, {
    classMethods: {
        // associations can be defined here
      associate: function(models) {
        // associations can be defined here
        Verif.belongsTo(models.User, { foreignKey: 'user_id' })
      }
    }
  });
  return Verif;
};
