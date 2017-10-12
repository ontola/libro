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
  target: 'node',
  entry: path.resolve('./server/init'),

  output: {
    path: path.resolve(`${__dirname}/../dist/`),
    filename: 'server.js',
  },

  resolve: {
    modules: ['./node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.json'],
  },

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
          }
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

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
      "import devMiddleware from './utils/devMiddleware';": 'undefined',
    }),
    new StringReplacePlugin(),
  ],
};

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
