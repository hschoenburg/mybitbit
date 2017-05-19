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

  factory.define('debit', models.Debit, { 
    usd_amount: 100,
    xlm_amount: 999,
    php_amount: 888,
    user_id:    8,
    recipient_address: 'hans@hans.com'
  })

 factory.define('credit', models.Credit, { 
    usd_amount: 10,
    source: 'stripe',
    user_id: 1

 })

  return factory;

}


