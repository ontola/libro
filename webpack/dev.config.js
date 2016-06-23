"use strict";
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: {
    main: ['webpack-hot-middleware/client', './app/index.js'],
  },

  resolve: {
    unsafeCache: true,
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loader: 'style!css-loader!postcss-loader!sass-loader',
    }],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
