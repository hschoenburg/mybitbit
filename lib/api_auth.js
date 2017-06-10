var jwt = require('jsonwebtoken')

exports.jwtAuthCheck = function(req, res, next) {

  token = req.headers['x-api-token']
  var auth = false;

  if(!token) {
    return res.status(401).json({ success: false, message: 'No Token Provided' });
  } else {

    // TO DO put a promise here to catch errors
    jwt.verifyJwt(token, process.env.JWT_PRIVATE_KEY,  function(err, data) {
      if(err) {
        return res.status(401).json({ success: false, message: 'Invalid Token' })
      }  else {
        req.user = { id: data.user_id }
        next();
      }
    })
  }
}

