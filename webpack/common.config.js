const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const version = require('./version');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
  externals: {
    URL: 'self.URL',
    'any-promise': 'Promise',
    fetch: 'self.fetch',
    'isomorphic-fetch': 'self.fetch',
    jsonld: '{}',
    'solid-auth-cli': 'null',
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
      }, {
        test: /\.(otf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=f_assets/fonts/',
      }, {
        test: /\.(svg)$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist', 'public'),
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'static/preloader.css',
        to: path.resolve(__dirname, '..', 'dist', 'public'),
      },
    ]),
    new webpack.ProvidePlugin({
      xmlhttprequest: 'imports-loader?this=>global!exports-loader?global.XMLHttpRequest!global.XMLHttpRequest',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __TEST__: process.env.NODE_ENV === 'test',
      __VERSION__: JSON.stringify(version),
      'process.env': {
        ARGU_API_URL: JSON.stringify(process.env.ARGU_API_URL),
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      filename: 'public/offline.html',
      template: 'app/offline.html',
    }),
    new InjectManifest({
      exclude: [/^private\//],
      mode: 'development',
      swDest: './public/sw.js',
      swSrc: './src/sw/index.js',
    }),
  ],

  resolve: {
    alias: {
      react: path.resolve('node_modules/react'),
      static: path.resolve('./static'),
    },
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
    modules: ['./node_modules'],
  },
};

module.exports = common;
