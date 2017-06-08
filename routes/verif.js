var models = require('../models/index')
var creators = require('../lib/creators/index')
var apiAuth = require('../lib/api_auth')
var Promise = require('bluebird')

module.exports = function(app) {

  app.get('/verifs/:code', function(req, res, next) {
    // look up verif and mark it as redeemded
    models.Verif.findAll({where: { code: req.params.code}, include: [{model: models.Recipient}] }).then(function(verif) {

      verif[0].redeemed = true;
      verif[0].Recipient.email_verif = true;

      Promise.join(verif[0].save(), verif[0].Recipient.save(), function(verif, recipient) {

        res.send("success you are verified!")
      })


    }).catch(function(err) {
      console.log(err);
      throw err;
    })

  })

    /*
    models.Recipient.findAll({where: {sender_id: req.user.id}}).then(function(recipients) {
      res.status(200)
      res.json({recipients: recipients})
    })
    */
}

