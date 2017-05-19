/* Stellar Lib MyBitBit

  Leverages the stellar jacvascript SDK to do the following


  1. Send a transaction
    For now we are sending from one testnet account to the other.
    The sending private key is stored in process.env.
    The recipient public key is hardcoded here into this file.

  This Lib is used by the Express controller to send a traction.

  function send(amount, recipient)
  Amount is given in XLM for now. 
  Create a "Debit" and save it after sending the txn.
  Respond with a success confirmation.
  */

var Stellar = require('stellar-sdk');

var models = require('../models/index')


exports.sendXlm = function(opts) {


})
