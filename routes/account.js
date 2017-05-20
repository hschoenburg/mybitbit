var userUtils = require('../lib/user_utils')
var apiAuth = require('../lib/api_auth')

module.exports = function(app, passport) {

  app.get('/account/balance/:user_id', apiAuth.jwtAuthCheck, function(req, res, next) {

    userUtils.calcBalance(req.params.user_id).then(function(bal) {
      res.json({user_id: Number(req.params.user_id), usd_balance: bal })

    }).catch(function(err) { throw err; })
  })
}
