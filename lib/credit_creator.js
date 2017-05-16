var Promise = require('bluebird')
var models = require('../models/index');
var User = models.User
var Credit = models.Credit



exports.createForReward = function(usd_amount, user_id) {

  return Credit.create({user_id: user_id, usd_amount: usd_amount, source: 'reward',})
}
