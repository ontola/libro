const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./common.config.babel.js');
const devBuild = process.env.NODE_ENV !== 'production';

config.entry = './app/index.js';

config.output.publicPath = '/dist/';

config.module.loaders.push(
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
  }
);

config.plugins.push(
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
  })
);

if (devBuild) {
  console.log('Webpack dev build');
  config.devtool = 'cheap-module-source-map';
} else {
  console.log('Webpack production build');
}

module.exports = config;
