import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

import development from './dev.config.js';
import production from './prod.config.js';
import developmentSSR from './dev.ssr.config.js';

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

if (process.env.NODE_ENV === 'production') {
  devUrl = '/dist/';
}

const common = {
  output: {
    path: __dirname + '/../dist/',
    publicPath: devUrl,
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
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
    })
  ],

  postcss: (wp) => {
    return [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ];
  },
};

if (process.env.NODE_ENV === 'development' && !global.ssr) {
  module.exports = merge(development, common);
}

if (process.env.NODE_ENV === 'development' && global.ssr) {
  module.exports = merge(developmentSSR, common);
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(production, common);
}
