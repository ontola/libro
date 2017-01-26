const config = require('./common.config');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const HappyPack = require('happypack');

config.cache = 'true';
config.entry = './test/testhelper.js';
config.externals = [nodeExternals()];
config.output = {};

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules'),
};

config.module.loaders.unshift(
  {
    test: /(\.jsx|\.js)?$/,
    loaders: ['happypack/loader?id=babel'],
    exclude: /node_modules/,
    include: /app/,
  }
);

config.module.loaders.push({
  test: /\.scss$/,
  loader: 'null-loader',
});

config.plugins.push(
  new HappyPack({
    id: 'babel',
    threads: 4,
    loaders: ['babel-loader?cacheDirectory'],
  })
);


module.exports = config;
