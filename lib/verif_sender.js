var models = require('../models/index')
var Sparky = require('sparkpost')
var sparkPost = new Sparky(process.env.SPARKPOST_KEY || 'DUMMYKEY')


exports.verifyEmail = function(verif_id) {

  var verif;

  return new Promise(function(fulfill, reject)  {
  
    models.Verif.findById(verif_id, {include: [ {model: models.User}]}).then(function(fresh_verif) {
        verif = fresh_verif;

        var code = verif.code
        var email = verif.User.email

        if(!code || !email) { 
          throw "Missing code or email";
        }
        var verif_link = "<html><body><p><a href='" + process.env.HOSTNAME + "/verifs/redeem/" + verif.code + "'>Click here to verify your email address</a></p></body></html>";

        return sparkPost.transmissions.send({
          options: {
            sandbox: false,
          },
          content: {
            from: 'hans@mybitbit.com',
            subject: 'Beta Staging: Do you want some PHP? Time to verify your email!',
            html: verif_link,

          },
          recipients: [
            {address: email}
          ]
      }).catch(function(err) {
        console.log(err)
      })
    }).then(function(data) {
      verif.sent_at = Date.now();
      return verif.save()
    }).then(function(saved_verif) {
      fulfill(saved_verif)
    }).catch(function(err) {
      reject(err)
    })
  })
}

