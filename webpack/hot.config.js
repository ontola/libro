require('react-hot-loader/patch');
const path = require('path');
const webpack = require('webpack');
const config = require('./common.config');
const HappyPack = require('happypack');

config.output.publicPath = '/dist/';
config.output.pathinfo = true;

config.entry = [
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
  './app/index.js',
];

config.cache = 'true';

config.devtool = 'eval';

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules'),
};

config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['happypack/loader?id=scss'],
});

config.plugins.push(
  new HappyPack({
    id: 'scss',
    threads: 4,
    loaders: ['style!css-loader!postcss-loader!sass-loader?cacheDirectory'],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

module.exports = config;
