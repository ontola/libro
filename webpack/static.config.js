const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/dist/';

config.entry = [
  './app/index.js',
];

config.module.loaders.unshift(
  {
    test: /(\.jsx\.js)?$/,
    loaders: ['babel-loader'],
    exclude: /node_modules/,
    include: /app/,
  }
);

config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
});

config.plugins.push(
  new ExtractTextPlugin('bundle.css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.ARGU_API_EXT_BASE': JSON.stringify(
      process.env.ARGU_API_EXT_BASE ||
      'https://aod-search.argu.co/api/'
    ),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
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
