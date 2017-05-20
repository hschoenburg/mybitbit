var jwt = require('./jwt_utils')

exports.jwtAuthCheck = function(req, res, next) {

  console.log('MIDDLEWARE')
  token = req.headers['x-api-token']
  var auth = false;
  console.log(token)

  jwt.verifyJwt(token).then(function(data) {
    console.log(data)
      // add some data to the request?
    // we might need to standardize the payload in that case
    // set user_id for instance.
    // that is probably it
      next();
  }).catch(function(err) {
    console.log('#############')
    console.log(err);
    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
  })
}

