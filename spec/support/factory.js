var factory = require('factory-girl').factory;  

module.exports = function(models) {

  factory.define('user', models.User, { 
    first_name: "AJ",
    last_name:  "GoogenHammer",
    email:      "goog@hammer.com"
  })

  return factory;

}


