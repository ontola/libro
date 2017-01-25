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
      state: path.resolve('app/state'),
      components: path.resolve('app/components'),
      containers: path.resolve('app/containers'),
      helpers: path.resolve('app/helpers'),
      models: path.resolve('app/models'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
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
      'process.env.ELASTICSEARCH_URL': JSON.stringify(process.env.ELASTICSEARCH_URL),
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nl/),
  ],
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
};

module.exports = common;
