const path = require('path');

const nodeExternals = require('webpack-node-externals');

const config = require('./common.config');

config.cache = true;
config.entry = path.resolve('./tests/testhelper.js');
config.externals = [
  nodeExternals(),
  { '../../../../node_modules/react.js': 'react' },
  { '../../../node_modules/react.js': 'react' },
  { '../../node_modules/react.js': 'react' }
];

config.output = {};

config.module.rules.unshift(
  {
    include: [
      /app/,
      /node_modules\/link-redux/,
      /node_modules\/whatwg-url/,
      /node_modules\/universal-url/,
      /node_modules\/webidl-conversions/,
      /node_modules\/ml-disjoint-set/,
    ],
    test: /(\.jsx\.js)?$/,
    use: ['babel-loader'],
  }
);

config.module.rules.push({
  loader: 'null-loader',
  test: /\.scss$/,
});

module.exports = config;
