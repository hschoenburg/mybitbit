var models = require('../models/index');
var Promise = require('bluebird');


exports.calcBalance = function(user_id) {
  //models.User.findAll({where: {id: user.id }, include: [ {model: models.Debit} ]})
 return new Promise(function(fulfill, reject) { 
    models.User.findById(user_id, {include: [ { model: models.Debit}, {model: models.Credit}]}).then(function(user) {

      var credit = user.Credits.reduce(function(total, num) { return total + num.usd_amount }, 0)

      var debit = user.Debits.reduce(function(total, num) { return total + num.usd_amount }, 0)
      fulfill(credit - debit)

      if(!user) { reject ('no user found'); }
    })
 })

}
