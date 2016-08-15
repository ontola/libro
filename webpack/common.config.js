const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
  output: {
    path: `${__dirname}/../dist/`,
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: ['./node_modules'],
    extensions: ['', '.js', '.jsx', '.ts'],
    alias: {
      react: path.join(__dirname, 'node_modules/react'),
      components: path.join(__dirname, 'app/components'),
      containers: path.join(__dirname, 'app/containers'),
      state: path.join(__dirname, 'app/state'),
      models: path.join(__dirname, 'app/models'),
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
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
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

module.exports = common;
