// const path = require('path');

// require('react-hot-loader/patch');
const HappyPack = require('happypack');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/dist/';
config.output.pathinfo = true;

config.entry = [
  'webpack-hot-middleware/client',
  'react-hot-loader/patch',
  './app/index.js',
];

config.cache = true;

config.devtool = 'eval';

config.module.rules.unshift(
  {
    test: /(\.jsx\.js)?$/,
    use: [{
      loader: 'happypack/loader',
      options: {
        id: 'babel'
      }
    }],
    exclude: /node_modules/,
    include: /app/,
  }
);

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
    threads: 4,
    loaders: ['babel-loader?cacheDirectory'],
  }),
  new HappyPack({
    id: 'scss',
    threads: 4,
    loaders: ['style-loader!css-loader!postcss-loader!sass-loader?cacheDirectory'],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

module.exports = config;
