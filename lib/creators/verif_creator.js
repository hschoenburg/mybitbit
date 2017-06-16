var Promise = require('bluebird')
var models = require('../../models/index');
var Verif = models.Verif;

exports.create = function(opts) {
  var code;
  return new Promise(function(fulfill, reject) {

    switch(opts.method) {

      case 'email':
        code = Math.random().toString(36).slice(2);
        break;
      case 'phone':
        code = Math.round(Math.random() * 1000)
        break;
    }

    fulfill(Verif.create({user_id: opts.user_id,
        method: opts.method,
        code: code,
        redeemed: false
      }))
  }).catch(function(err) {
    throw err;
  })
}

