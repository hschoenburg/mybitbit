var userUtils = require('../lib/user_utils')

module.exports = function(app, passport) {

  app.get('/account/balance/:user_id', function(req,res,next) {

    userUtils.calcBalance(req.params.user_id).then(function(bal) {
      res.json({user_id: Number(req.params.user_id), usd_balance: bal })

    }).catch(function(err) { throw err; })
  })
}
