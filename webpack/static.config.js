const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/dist/';

config.entry = [
  './app/index.js',
];

config.module.rules.unshift(
  {
    test: /(\.jsx\.js)?$/,
    use: ['babel-loader'],
    exclude: /node_modules/,
    include: /app/,
  }
);

config.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ]
  }),
});

config.plugins.push(
  new ExtractTextPlugin({
    filename: 'bundle.css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.ARGU_API_EXT_BASE': JSON.stringify(
      process.env.ARGU_API_EXT_BASE ||
      'https://beta.argu.co/api/'
    ),
  }),
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    xmlhttprequest: 'imports?this=>global!exports?global.XMLHttpRequest!global.XMLHttpRequest'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.ProvidePlugin({
    fetch: 'isomorphic-fetch',
  })
);

config.stats = {
  // minimal logging
  assets: false,
  colors: true,
  version: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  children: false,
};

module.exports = config;
