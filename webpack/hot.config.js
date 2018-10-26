const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common.config');
const version = require('./version');

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
        test: /\.((t|j)sx?)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  output: {
    globalObject: "(typeof self !== 'undefined' ? self : this)",
    pathinfo: true,
    publicPath: '/f_assets/',
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version),
      'process.env.FRONTEND_HOSTNAME': JSON.stringify(process.env.FRONTEND_HOSTNAME),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
