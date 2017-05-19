module.exports = function(app, passport, models) {

  app.get('/account/balance/:user_id', function(req,res,next) {
    res.send({user_id: req.user.id})
  })

}
