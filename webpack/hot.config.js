const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./common.config');

module.exports = merge(common, {
  cache: true,

  devServer: {
    allowedHosts: [
      '.localdev',
      '.localtest',
    ],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    hot: true,
    port: 3001,
    proxy: {
      '!**/ws': {
        context: () => true,
        onProxyReqWs: (proxyReq, req, socket) => {
          socket.on('error', (err) => {
            // eslint-disable-next-line no-console
            console.log('Socket error using onProxyReqWs event', err);
          });
        },
        target: 'http://localhost:3080',
        toProxy: true,
        ws: true,
        xfwd: true,
      },
    },
  },

  devtool: 'eval-cheap-source-map',

  entry: [
    './app/index.tsx',
  ],

  mode: 'development',

  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        exclude: /node_modules/,
        test: /\.(m?(t|j)sx?)$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  output: {
    globalObject: "(typeof self !== 'undefined' ? self : this)",
    pathinfo: false,
    publicPath: '/',
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      __LEGACY__: false,
    }),
  ],

  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
});
