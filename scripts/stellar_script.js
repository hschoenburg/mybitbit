var StellarSdk = require('stellar-sdk');
var request = require('request');
var Promise = require('bluebird');
var StellarBit = require('./stellarBit')


var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

var testPubOne    = 'GBKFLN553AUG32BDW5UHYQWEQRD3U5QZPQA5IWNXZ62453VLREWBXAE5'

var testPubTwo    = 'GCCOXY5LTVZ5GQVQDIKS6235QEZOISGKEUU4WHQ2SUDDBLLHT7ZXC5TX'

var testSecretOne = 'SC2EPWKXJVFVFQIGWIJQUKBC3DS7NZ3Z7OLHKYOCHMKWLP4BM3JBU2YK'

var testSecretTwo = 'SBBMTA4DQNRNNH24DPSUOFHKOLM6QTHNHNALH2NPJKDGEJTT6ZJR7RN7'


//StellarBit.showBalance(testPubOne);
//console.log("$$$$$$$$$$$$");
//return StellarBit.showBalance(testPubTwo);
var pair = StellarSdk.Keypair.fromSecret(testSecretOne)
StellarBit.sendXLM({ destinationId: testPubTwo, pair: pair})



//var pair = StellarSdk.Keypair.fromSecret(secret)
//var pair = StellarSdk.Keypair.random()
//var command = process.argv[2]
//return StellarBit.createAccount();

