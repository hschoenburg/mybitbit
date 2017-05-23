var path = require('path');
var webpack = require('webpack')

module.exports = {
   entry: './client/index.jsx',
    output: {
      filename: 'client_bundle.js',
      path: path.resolve(__dirname, 'public/javascripts')
    },
		module: {
				rules: [
					{
						test: /.jsx?$/,
						exclude: /node_modules/,
						include: path.join(__dirname, 'client'),
						loader: 'babel-loader',
          },
     {
       test: /\.scss$/,
       use: [
        'style-loader',
        'css-loader',
        'sass-loader'
       ]
      }
    ]
  },
};

