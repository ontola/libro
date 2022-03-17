const nodeExternals = require('webpack-node-externals');

const config = require('./common.config');

config.cache = true;
config.externals = [
  nodeExternals(),
  { [require.resolve('react.js')]: 'react' },
];

config.output = {};

config.module.rules.push({
  include: [
    /app/,
    /node_modules\/link-redux/,
    /node_modules\/link-redux\/test/,
    /node_modules\/link-redux\/test\/fixtures/,
    /node_modules\/ol/,
    /node_modules\/whatwg-url/,
    /node_modules\/webidl-conversions/,
  ],
  test: /\.(m?(t|j)sx?)$/,
  use: ['ts-loader'],
});

config.module.rules.push({
  loader: 'null-loader',
  test: /\.scss$/,
});

module.exports = config;
