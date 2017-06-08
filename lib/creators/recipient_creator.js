var Promise = require('bluebird')
var models = require('../../models/index');
var Recipient = models.Recipient
var Verif = models.Verif


exports.create_with_verifs = function(opts) {
  var recipient;
  return new Promise(function(fulfill, reject) {

    var method, code;
    if(opts.email.length > 0) {
      method = 'email';
      code = Math.random().toString(36).slice(2);
    } else if(opts.phone.length > 0) {
      method = 'sms';
      code = Math.round(Math.random() * 1000)
    }

  Recipient.create({sender_id: opts.sender_id,
                    name: opts.name,
                    email: opts.email,
                    phone: opts.phone,
                    email_verif: false,
                    phone_verif: false})
    .then(function(newRecipient) {
      recipient = newRecipient;

      return Verif.create({recipient_id: recipient.id,
                    method: method,
                    code: code,
                    redeemed: false
      })
    })
    .then(function(verif) {
      fulfill({ recipient: recipient, verif: verif})
    })
    .catch(function(err) {
      reject(err);
    })
  })
}
