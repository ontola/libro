const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./common.config');

module.exports = merge(common, {
  cache: true,

  devServer: {
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    hot: true,
    port: 3001,
    proxy: [
      {
        context: (filePath) => filePath !== '/ws' && !filePath.startsWith('/static/'),
        logLevel: 'debug',
        onProxyReqWs: (proxyReq, req, socket) => {
          socket.on('error', (err) => {
            // eslint-disable-next-line no-console
            console.log('Socket error using onProxyReqWs event', err);
          });
        },
        target: 'http://localhost:3080',
        toProxy: true,
        ws: true,
        xfwd: false,
      },
    ],
    static: {
      directory: path.join(__dirname, '..', 'static'),
    },
  },

  devtool: 'eval-cheap-module-source-map',

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
        exclude: [
          /node_modules/,
          /sw\/index\.js/
        ],
        test: /\.(m?(t|j)sx?)$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2018',
            tsconfigRaw: require(path.resolve(__dirname, '..', 'tsconfig.json')),
          },
        },
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
