const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: './app/index.js',

  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
    }],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
};
