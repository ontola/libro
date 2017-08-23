const path = require('path');

const nodeExternals = require('webpack-node-externals');
const HappyPack = require('happypack');

const config = require('./common.config');

config.cache = true;
config.entry = './tests/testhelper.js';
config.externals = [
  nodeExternals(),
  { '../../../node_modules/react.js': 'react' },
  { '../../node_modules/react.js': 'react' }
];

config.output = {};

config.module.loaders.unshift(
  {
    exclude: /node_modules/,
    include: /app/,
    loaders: ['happypack/loader?id=babel'],
    test: /(\.jsx|\.js)?$/,
  }
);

config.module.loaders.push({
  loader: 'null-loader',
  test: /\.scss$/,
});

config.plugins.push(
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threads: 4,
  })
);


module.exports = config;
