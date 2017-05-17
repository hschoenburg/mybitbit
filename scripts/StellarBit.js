var request = require('request');
var Promise = require('bluebird');
var StellarSdk = require('stellar-sdk');

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

exports.showBalance = function(pub_key) {
  server.loadAccount(pub_key).then(function(account) {
    console.log('Balances for account: ' + pub_key);
    account.balances.forEach(function(balance) {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    })
  })
}

exports.sendXLM = function(opts) {

  server.loadAccount(opts.destinationId)

  .catch(StellarSdk.NotFoundError, function(error) {
    throw new Error('Destination account does not exist');
  })

  .then(function(destinationAccount) {
    //console.log(destinationAccount._baseAccount._accountId)
    return server.loadAccount(opts.pair.publicKey())

  })

  .catch(StellarSdk.NotFoundError, function(error) {
    throw new Error('Source account does not exist' + error) 
  })
  .then(function(sourceAccount) {

    var txn = new StellarSdk.TransactionBuilder(sourceAccount) 
      .addOperation(StellarSdk.Operation.payment({
        destination: opts.destinationId,
        asset: StellarSdk.Asset.native(),
        amount: "10"
      }))
      
    //.addMemo(StellarSdk.memo.text('Test '))
      .build();

    //txn.sign(opts.pair)

    //return server.submitTransaction(txn)

    return new Promise(function(fullfill, reject) { fulfill('hey') })
  })

  .then(function(result) {
    console.log('Success! Results:', result);
    })
  .catch(function(error) {
    throw new Error('Something wrong with Txn', error);
    });
}

exports.fundAccount = function(pair) {

  console.log(pair.publicKey())
  console.log('$$$');
  console.log(pair.secret())

  request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: pair.publicKey() },
    json: true
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.error('ERROR!', error || body);
    }
    else {
      console.log('SUCCESS! You have a new account :)\n', body);
    }
  })
}
