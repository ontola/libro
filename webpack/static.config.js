const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

const config = require('./common.config');

config.output.publicPath = '/f_assets/';

config.entry = [
  './app/index.js',
];

config.output.filename = 'bundle-[chunkhash].js';

config.module.rules.unshift({
  include: [
    /app/,
    /node_modules\/whatwg-url/,
    /node_modules\/universal-url/,
    /node_modules\/webidl-conversions/,
    /node_modules\/ml-disjoint-set/,
  ],
  test: /(\.jsx\.js)?$/,
  use: ['babel-loader'],
});

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
    filename: 'bundle-[contenthash].css'
  }),
  new webpack.DefinePlugin({
    'process.env.ARGU_API_EXT_BASE': JSON.stringify(process.env.ARGU_API_EXT_BASE ||
      'https://beta.argu.co/api/'),
    'process.env.NODE_ENV': JSON.stringify('production'),
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
  }),
  new webpack.HashedModuleIdsPlugin(),
  new ManifestPlugin({
    fileName: '../private/manifest.json',
    publicPath: '/f_assets/',
  })
);

config.stats = {
  // minimal logging
  assets: false,
  children: false,
  chunkModules: false,
  chunks: false,
  colors: true,
  timings: false,
  version: false,
};

module.exports = config;
