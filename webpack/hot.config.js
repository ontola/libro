const path = require('path');
const webpack = require('webpack');
const config = require('./common.config');

config.output.publicPath = 'http://localhost:3000/dist/';

config.entry = [
  'webpack-hot-middleware/client',
  './app/index.js',
];

config.devtool = 'inline-eval-cheap-source-map';

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules'),
};

config.module.loaders.push({
  test: /\.scss$/,
  loader: 'style!css-loader!postcss-loader!sass-loader',
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

module.exports = config;
