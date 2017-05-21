var path = require('path');
var webpack = require('webpack')

module.exports = {
   entry: './client/index.js',
    output: {
      filename: 'client_bundle.js',
      path: path.resolve(__dirname, 'public/javascripts')
    }
};

