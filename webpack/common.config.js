const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
  externals: {
    URL: 'self.URL',
    fetch: 'self.fetch',
    'isomorphic-fetch': 'self.fetch',
    jsonld: '{}',
    'solid-auth-client': 'self.fetch',
    'universal-url': '{URL: self.URL}',
    'whatwg-url': 'self.URL',
    xmldom: '{}',
    xmlhttprequest: 'self.XMLHttpRequest',
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.png$/,
        use: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.jpg$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(`${__dirname}/../dist/public/`),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      'static/robots.txt',
      'static/preloader.css',
    ]),
    new webpack.ProvidePlugin({
      xmlhttprequest: 'imports-loader?this=>global!exports-loader?global.XMLHttpRequest!global.XMLHttpRequest',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __ORIGIN__: JSON.stringify(`https://${process.env.FRONTEND_HOSTNAME}`),
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __TEST__: process.env.NODE_ENV === 'test',
      'process.env': {
        ARGU_API_URL: JSON.stringify(process.env.ARGU_API_URL),
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

  resolve: {
    alias: {
      react: path.resolve('node_modules/react'),
      static: path.resolve('./static'),
    },
    extensions: ['.js', '.jsx', '.ts'],
    modules: ['./node_modules'],
  },
};

module.exports = common;
