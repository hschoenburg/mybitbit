'use strict';
module.exports = function(sequelize, DataTypes) {
  var Credit = sequelize.define('Credit', {
    usd_amount: DataTypes.INTEGER,
    source: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Credit;
};
