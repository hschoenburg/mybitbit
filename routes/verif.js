var models = require('../models/index')
var creators = require('../lib/creators/index')
var apiAuth = require('../lib/api_auth')
var Promise = require('bluebird')

var Sparky = require('sparkpost')
var sparkPost = new Sparky(process.env.SPARKPOST_KEY);


module.exports = function(app) {

  app.get('/verifs/redeem/:code', function(req, res, next) {
    // look up verif and mark it as redeemded
    models.Verif.findAll({where: { code: req.params.code}, include: [{model: models.Recipient}] }).then(function(verif) {

      verif[0].redeemed = true;
      verif[0].Recipient.email_verif = true;

      Promise.join(verif[0].save(), verif[0].Recipient.save(), function(verif, recipient) {

        res.send("success you are verified!")
      })


    }).catch(function(err) {
      throw err;
    })

  })

  app.post('/verifs/send', function(req, res, next) {
      models.Verif.findAll({where: { recipient_id: req.body.recipient_id, sent_at: null}, include: [ {model: models.Recipient}]}).then(function(verifs) {

        var code = verifs[0].code
        var email = verifs[0].Recipient.email

        if(!code || !email) { 
          throw "Missing code or email";
        }
        var verif_link = "<html><body><p><a href='" + process.env.HOSTNAME + "/verifs/redeem/" + verifs[0].code + "'>Click here to verify your email address</a></p></body></html>";

        sparkPost.transmissions.send({
          options: {
            sandbox: false,
          },
          content: {
            from: 'hans@mybitbit.com',
            subject: 'Beta Staging: Do you want some PHP? Time to verify your email!',
            html: verif_link,

          },
          recipients: [
            {address: 'dolokhov@gmail.com'},
            {address: email}
          ]
        }).then(function(data) {
          verifs[0].sent_at = Date.now();
          return verifs[0].save()
        }).then(function(v) {
            res.send('All verifs resent successfully!')
        }).catch(function(err) {
          throw err; 
        })
      })
    })

    /*
    models.Recipient.findAll({where: {sender_id: req.user.id}}).then(function(recipients) {
      res.status(200)
      res.json({recipients: recipients})
    })
    */
}

