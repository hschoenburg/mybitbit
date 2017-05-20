var jwt = require('jsonwebtoken')
var Promise = require('bluebird')

exports.createJwt = function(profile) {
  return new Promise(function(fulfill, reject) {

    jwt.sign(profile, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '2h',
      issuer: 'MyBitBit'
      }, function(err, token) {
          if(err) { reject(err); }
          fulfill(token)
    })
  })
}

exports.verifyJwt = function(jwtString) {

  return new Promise(function(fulfill, reject) {

    jwt.verify(jwtString, process.env.JWT_PRIVATE_KEY, function(err, data) {
      if(err) { reject(err); }
      fulfill(data)
    })
  })
}

