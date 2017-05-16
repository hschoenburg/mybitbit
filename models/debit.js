'use strict';
module.exports = function(sequelize, DataTypes) {
  var Debit = sequelize.define('Debit', {
    usd_amount: DataTypes.INTEGER,
    xlm_amount: DataTypes.INTEGER,
    php_amount: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    recipient_address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Debit.belongsTo(models.User, {foreignKey: 'user_id'})
      }
    }
  });
  return Debit;
};
