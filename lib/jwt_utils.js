var jwt = require('jsonwebtoken')
var Promise = require('bluebird')

exports.createJwt = function(data) {
    return jwt.sign({profile: data.profile, user_id: data.user_id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn: '2h',
        issuer: 'MyBitBit'
      })
}

exports.verifyJwt = function(jwtString, callback) {
    return jwt.verify(jwtString, process.env.JWT_PRIVATE_KEY)
}

