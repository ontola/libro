/* eslint-env node */
const path = require('path');

const StringReplacePlugin = require('string-replace-webpack-plugin');
const webpack = require('webpack');

const version = require('./webpack/version');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const config = {
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-source-map' : false,

  entry: path.resolve('./server.js'),

  externals: {
    'any-promise': 'Promise',

    // Application libraries
    'body-parser': 'body-parser',
    'connect-redis': 'connect-redis',
    'csurf': 'csurf',
    'dotenv': 'dotenv',
    'express': 'express',
    'express-session': 'express-session',
    'express-static-gzip': 'express-static-gzip',
    'http-proxy-middleware': 'http-proxy-middleware',
    'ioredis': 'ioredis',
    'isomorphic-fetch': 'isomorphic-fetch',
    'morgan': 'morgan',
    'request': 'request',
    'rimraf': 'rimraf',
    'shrink-ray-current': 'shrink-ray-current',
    'useragent': 'useragent',
    'uuid': 'uuid',

    // Development & build libraries
    // eslint-disable-next-line sort-keys
    'clean-webpack-plugin': 'clean-webpack-plugin',
    'compression-webpack-plugin': 'compression-webpack-plugin',
    'copy-webpack-plugin': 'copy-webpack-plugin',
    'html-webpack-plugin': 'html-webpack-plugin',
    'webpack': 'webpack',
    'webpack-merge': 'webpack-merge',
    'webpack-pwa-manifest': 'webpack-pwa-manifest',
    'workbox-webpack-plugin': 'workbox-webpack-plugin',
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['null-loader'],
      },
      {
        include: [
          path.resolve(__dirname, './app'),
          path.resolve(__dirname, './server'),
          path.resolve(__dirname, './src/sw'),
          path.resolve(__dirname, './node_modules/link-lib'),
          path.resolve(__dirname, './node_modules/link-redux'),
        ],
        test: /\.(m?(t|j)sx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              comments: false,
              compact: false,
              minified: false,
              presets: [
                '@babel/preset-typescript',
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 12,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },

  optimization: {
    usedExports: true,
  },

  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(`${__dirname}/dist/private`),
  },

  plugins: [
    new StringReplacePlugin(),
    new webpack.ProvidePlugin({
      atob: 'atob',
      btoa: [path.resolve(__dirname, './globals'), 'btoa'],
      fetch: 'isomorphic-fetch',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __TEST__: false,
      __VERSION__: JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
    fallback: {
      pnpapi: false,
    },
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
