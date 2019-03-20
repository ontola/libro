const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const common = require('./common.config');
const manifest = require('./manifest.json');

module.exports = merge(common, {
  cache: true,

  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './app/index.jsx',
  ],

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(m?(t|j)sx?)$/,
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
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin({
      __LEGACY__: false,
      'process.env.FRONTEND_HOSTNAME': JSON.stringify(process.env.FRONTEND_HOSTNAME),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackPwaManifest({
      ...manifest,
      filename: 'manifest.json',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
