const nodeExternals = require('webpack-node-externals');

const config = require('./common.config');

config.cache = true;
config.externals = [
  nodeExternals(),
  { '../../../../node_modules/react.js': 'react' },
  { '../../../node_modules/react.js': 'react' },
  { '../../node_modules/react.js': 'react' },
];

config.output = {};

config.module.rules.push({
  include: [
    /app/,
    /node_modules\/link-redux/,
    /node_modules\/link-redux\/test/,
    /node_modules\/link-redux\/test\/fixtures/,
    /node_modules\/whatwg-url/,
    /node_modules\/universal-url/,
    /node_modules\/webidl-conversions/,
    /node_modules\/ml-disjoint-set/,
  ],
  test: /\.(m?(t|j)sx?)$/,
  use: ['babel-loader'],
});

config.module.rules.push({
  loader: 'null-loader',
  test: /\.scss$/,
});

module.exports = config;
