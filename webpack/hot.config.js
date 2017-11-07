// const path = require('path');

// require('react-hot-loader/patch');
const HappyPack = require('happypack');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/f_assets/';
config.output.pathinfo = true;

config.entry = [
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
  './app/index.js',
];

config.cache = true;

config.devtool = 'eval';

config.module.rules.unshift({
  exclude: /node_modules/,
  include: /app/,
  test: /(\.jsx\.js)?$/,
  use: [{
    loader: 'happypack/loader',
    options: {
      id: 'babel'
    }
  }],
});

config.module.rules.push({
  test: /\.scss$/,
  use: [
    {
      loader: 'happypack/loader',
      options: { id: 'scss' },
    },
  ],
});

config.plugins.push(
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threads: 4,
  }),
  new HappyPack({
    id: 'scss',
    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    threads: 4,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

module.exports = config;
