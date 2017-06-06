var jwt = require('./jwt_utils')

exports.jwtAuthCheck = function(req, res, next) {

  token = req.headers['x-api-token']
  var auth = false;

  if(!token) {
    return res.status(401).json({ success: false, message: 'No Token Provided' });
  } else {

    jwt.verifyJwt(token).then(function(data) {
      req.user = { id: data.user_id }
        // add some data to the request?
      // we might need to standardize the payload in that case
      // set user_id for instance.
      // that is probably it
        next();
    }).catch(function(err) {
      console.log(err);
      return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
    })
  }
}

