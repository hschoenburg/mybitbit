var Promise = require('bluebird')
var models = require('../../models/index');
var User = models.User
var Debit = models.Debit



exports.createForTxn = function(opts) {

  return Debit.create({user_id: opts.user_id, 
                        usd_amount: opts.usd_amount, 
                        recipient_address: opts.recipient})
}
