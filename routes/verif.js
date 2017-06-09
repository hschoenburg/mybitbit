var models = require('../models/index')
var creators = require('../lib/creators/index')
var apiAuth = require('../lib/api_auth')
var Promise = require('bluebird')

var Sparky = require('sparkpost')
var sparkPost = new Sparky(process.env.SPARKPOST_KEY);


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

  app.post('/verifs/send', function(req, res, next) {
      models.Verif.findAll({where: { recipient_id: req.body.recipient_id, sent_at: null}, include: [ {model: models.Recipient}]}).then(function(verifs) {

        console.log(verifs[0].code)
        console.log(verifs[0].Recipient.email)
        res.end()
        var verif_link = '<a href="localhost:3000/verifs/redeem/' + verifs[0].code + '"</a>';
        console.log(verif_link)

        sparkPost.transmissions.send({
          options: {
            sandbox: true,
          },
          content: {
            from: 'hans@mybitbit.com',
            subject: 'Someone Wants to send you PHP',
            html: '<html><body><p> Please verify your email address by clicking on this link</p>'+ verif_link + '</body></html>',
          },
          recipients: [
            {address: 'hschoenburg@gmail.com'},
            {address: verifs[0].Recipient.email}
          ]
        }).then(function(data) {
          console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
          console.log(data);
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

