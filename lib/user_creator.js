
var Promise = require('bluebird')
var models = require('../models/index');
var User = models.User


module.exports = {

  create_from_facebook: function(fb_data) {

    return new Promise(function(fulfill, reject) {

      User.create({ email:fb_data.email}).then(function(user) {
        console.log('saving?');
        fulfill(user);
      }).catch(function(err) {
        reject(err);
      });

    })

  },

}
