"use strict";
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const development = require('./dev.config.js');
const developmentSSR = require('./dev.ssr.config.js');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

let devUrl;

// location dist for dev and prod
if (!global.ssr && process.env.NODE_ENV === 'development') {
  devUrl = 'http://localhost:3000/dist/';
}

if (global.ssr && process.env.NODE_ENV === 'development') {
  devUrl = 'http://localhost:3001/dist/';
}

const common = {
  output: {
    path: `${__dirname}/../dist/`,
    publicPath: devUrl,
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.ts'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },

  module: {
    loaders: [
      {
        test: /(\.jsx\.js)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        loader: 'file?name=[name].[ext]',
      }, {
        test: /\.jpg$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    }),
  ],

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
};

if (process.env.NODE_ENV === 'development' && !global.ssr) {
  module.exports = merge(development, common);
} else if (process.env.NODE_ENV === 'development' && global.ssr) {
  module.exports = merge(developmentSSR, common);
} else {
  module.exports = common;
}
