const path = require('path');

const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');

const pjson = require('../package.json');

const common = require('./common.config');

let bugsnagPlugin;
if (process.env.SEMAHORE_DEPLOY_NUMBER) {
  bugsnagPlugin = new BugsnagBuildReporterPlugin({
    apiKey: process.env.BUGSNAG_KEY,
    appVersion: pjson.version,
    releaseStage: process.env.SEMAPHORE_SERVER_NAME,
  });
}

function createConfig(options) {
  return {
    devtool: 'source-map',

    entry: {
      main: './app/index.jsx',
    },

    module: {
      rules: [
        {
          exclude: /node_modules/,
          include: [
            /app/,
            /node_modules\/whatwg-url/,
            /node_modules\/universal-url/,
            /node_modules\/webidl-conversions/,
            /node_modules\/ml-disjoint-set/,
          ],
          test: /\.(m?(t|j)sx?)$/,
          use: ['babel-loader'],
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        maxAsyncRequests: 8,
      },
    },

    output: {
      filename: `f_assets/[name]-[chunkhash].${options.buildName}.js`,
      path: path.resolve(__dirname, '..', 'dist', 'public'),
      publicPath: '/',
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: `f_assets/[name]-[contenthash].${options.buildName}.css`,
        path: path.resolve(__dirname, '..', 'dist', 'public'),
        publicPath: '/',
      }),
      new webpack.DefinePlugin({
        'process.env.FRONTEND_HOSTNAME': JSON.stringify(options.hostname),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.ProvidePlugin({
        xmlhttprequest: 'imports?this=>global!exports?global.XMLHttpRequest!global.XMLHttpRequest',
      }),
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new ManifestPlugin({
        fileName: `../private/manifest.${options.buildName}.json`,
        publicPath: '/',
      }),
      new CompressionPlugin({
        minRatio: 0.9,
      }),
      new BrotliPlugin(),
      bugsnagPlugin,
    ].filter(p => typeof p !== 'undefined'),

    stats: {
      // minimal logging
      assets: false,
      children: false,
      chunkModules: false,
      chunks: false,
      colors: true,
      timings: false,
      version: false,
    },
  };
}

module.exports = [
  merge(common, createConfig({
    buildName: 'min',
    hostname: process.env.FRONTEND_HOSTNAME || 'argu.co',
  })),
  merge(common, createConfig({
    buildName: 'localtest',
    hostname: 'app.argu.localtest',
  })),
  merge(common, createConfig({
    buildName: 'localdev',
    hostname: 'app.argu.localdev',
  })),
];
