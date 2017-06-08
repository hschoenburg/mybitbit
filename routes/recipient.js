var models = require('../models/index')
var creators = require('../lib/creators/index')
var apiAuth = require('../lib/api_auth')

module.exports = function(app) {

  app.get('/recipients', apiAuth.jwtAuthCheck, function(req, res, next) {
    console.log('$$$$$$$$$$$$$$$$$$$$$' + req.user.id);

    models.Recipient.findAll({where: {sender_id: req.user.id}}).then(function(recipients) {
      res.status(200)
      res.json({recipients: recipients})
    })
  })

  app.post('/recipients', apiAuth.jwtAuthCheck, function(req, res, next) {
    var data = req.body.recipient

    creators.recipient.create_with_verifs({
      sender_id: req.user.id,
      email: '',
      phone: data.phone,
      name: data.name
    }).then(function(recipient) {
      res.status(200)
      res.json({recipient_id: recipient.id, message: "Recipient Created!"})
    }).catch(function(err) {
      res.status(500)
      console.log(err) 
    })
  })
}

