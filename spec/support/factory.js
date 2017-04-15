var factory = require('factory-girl')
const adapter = new factory.SequelizeAdapter();
factory = factory.factory;
factory.setAdapter(adapter);
//var user = require('../../models/user')
//

//var factory = factory-girl.factory

module.exports = function(models) {

  factory.define('user', models.User, { 
    first_name: "AJ",
    last_name:  "GoogenHammer",
    email:      "goog@hammer.com"
  })

  return factory;

}


