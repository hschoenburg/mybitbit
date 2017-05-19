'use strict';
module.exports = function(sequelize, DataTypes) {
  var Debit = sequelize.define('Debit', {
    usd_amount:     DataTypes.INTEGER,
    xlm_amount:     DataTypes.INTEGER,
    php_amount:     DataTypes.INTEGER,
    // this is whatever fee amount we displayed to user at
    // time of Txn
    usd_fee_total:  DataTypes.INTEGER,

    //Number of XLM to USD at time of Txn
    xlm_usd_fx:     DataTypes.INTEGER,

    // Number of XLM to PHP at time of Txn
    xlm_php_fx:     DataTypes.INTEGER,

    user_id:        DataTypes.INTEGER,

    // Need to migrate table
    // Add usd_xlm_fx and usd_php_fx fields

    // note leave out the "*coins.asia" string here
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
