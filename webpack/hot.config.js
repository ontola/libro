// const path = require('path');

// require('react-hot-loader/patch');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common.config');

module.exports = merge(common, {
  cache: true,

  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './app/index.jsx',
  ],

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  output: {
    pathinfo: true,
    publicPath: '/f_assets/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.FRONTEND_HOSTNAME': JSON.stringify(process.env.FRONTEND_HOSTNAME),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
