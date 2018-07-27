// const path = require('path');

// require('react-hot-loader/patch');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/f_assets/';
config.output.pathinfo = true;

config.entry = [
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
  './app/index.jsx',
];

config.cache = true;

config.devtool = 'inline-source-map';

config.module.rules.unshift({
  exclude: /node_modules/,
  test: /\.(js|jsx)$/,
  use: ['babel-loader'],
});

config.module.rules.unshift({
  test: /\.(sa|sc|c)ss$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

module.exports = config;
