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
    fetch: 'self.fetch',
    xmlhttprequest: 'self.XMLHttpRequest',
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.(otf|ttf|woff|woff2)$/,
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
    filename: 'f_assets/[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/monaco-editor/min/vs',
          to: path.resolve(__dirname, '..', 'dist', 'f_assets', 'vs'),
        },
      ],
    }),
    new webpack.ProvidePlugin({
      './jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      'react/jsx-runtime.js': 'react/jsx-runtime',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __TEST__: process.env.NODE_ENV === 'test',
      __VERSION__: JSON.stringify(version),
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      filename: 'f_assets/offline.html',
      template: 'app/offline.html',
    }),
    new InjectManifest({
      exclude: [/^private\//],
      swDest: './f_assets/sw.js',
      swSrc: './src/sw/index.js',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
    },
    modules: ['./node_modules'],
  },
};

module.exports = common;
