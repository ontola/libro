const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const replacements = process.env.NODE_ENV === 'development'
  ? [{
    pattern: /a^/,
    replacement() { return ''; },
  }]
  : [{
    pattern: /^import devMiddleware from '[\w\W]+\/devMiddleware';$/m,
    replacement() { return ''; },
  }];

const config = {
  target: 'node',
  entry: './server/server',

  output: {
    path: `${__dirname}/../dist/`,
    filename: 'server.js',
  },

  resolve: {
    modulesDirectories: ['./node_modules'],
    extensions: ['', '.js', '.jsx', '.ts', '.json'],
  },

  externals: [nodeExternals()],

  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)+$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          compact: true,
          comments: false,
          minified: true,
          babelrc: false,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /(\.jsx|\.js)+$/,
        loader: StringReplacePlugin.replace({
          replacements,
        }),
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
      "import devMiddleware from './utils/devMiddleware';": 'undefinedfda',
    }),
    new StringReplacePlugin(),
  ],
};

config.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
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
