const path = require('path');

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
  entry: path.resolve('./server/init'),

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /(\.jsx|\.js)+$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              babelrc: false,
              comments: false,
              compact: true,
              minified: true,
              presets: ['react'],
            },
          },
        ],
      },
      {
        test: /(\.jsx|\.js)+$/,
        use: StringReplacePlugin.replace({
          replacements,
        }),
      },
    ],
  },

  output: {
    filename: 'server.js',
    path: path.resolve(`${__dirname}/../dist/private`),
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      "import devMiddleware from './utils/devMiddleware';": 'undefined',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new StringReplacePlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json'],
    modules: ['./node_modules'],
  },

  target: 'node',
};

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
