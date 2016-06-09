const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const development = require('./dev.config.js');
const production = require('./prod.config.js');
const developmentSSR = require('./dev.ssr.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var devUrl;

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
        loader: 'babel',
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
