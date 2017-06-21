const path = require('path');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;
const common = {
  module: {
    loaders: [
      {
        loader: 'json-loader',
        test: /\.json$/,
      },
      {
        loader: 'file?name=[name].[ext]',
        test: /\.png$/,
      }, {
        loader: 'file?name=[name].[ext]',
        test: /\.jpg$/,
      }, {
        loader: 'raw-loader',
        test: /\.md$/,
      },
    ],
  },

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/../dist/`,
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      'process.env': {
        ARGU_API_URL: JSON.stringify(process.env.ARGU_API_URL),
        FRONTEND_HOSTNAME: JSON.stringify(process.env.FRONTEND_HOSTNAME),
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      'process.env.ELASTICSEARCH_URL': JSON.stringify(process.env.ELASTICSEARCH_URL),
      __ORIGIN__: JSON.stringify(`https://${process.env.FRONTEND_HOSTNAME}`),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nl/),
  ],

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

  resolve: {
    alias: {
      components: path.resolve('app/components'),
      containers: path.resolve('app/containers'),
      helpers: path.resolve('app/helpers'),
      models: path.resolve('app/models'),
      react: path.resolve('node_modules/react'),
      state: path.resolve('app/state'),
      static: path.resolve('./static'),
    },
    extensions: ['', '.js', '.jsx', '.ts'],
    modulesDirectories: ['./node_modules'],
  },
};

module.exports = common;
