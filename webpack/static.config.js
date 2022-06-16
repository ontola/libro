const path = require('path');

const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const webpack = require('webpack');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-assets-manifest');
const { merge } = require('webpack-merge');

const { bundles } = require('../bundleConfig');

const common = require('./common.config');
const version = require('./version');

let bugsnagPlugin;

if (process.env.BUGSNAG_KEY && process.env.CI_COMMIT_BRANCH === 'master') {
  bugsnagPlugin = new BugsnagSourceMapUploaderPlugin({
    apiKey: process.env.BUGSNAG_KEY,
    appVersion: version,
    releaseStage: process.env.RAILS_ENV,
  });
}

function createConfig(options) {
  return {
    devtool: options.devtool,

    entry: {
      main: './app/index.tsx',
    },

    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-loader',
            'resolve-url-loader',
          ],
        },
        {
          include: [
            path.resolve(__dirname, '../app'),
            path.resolve(__dirname, '../node_modules/@dnd-kit'),
            path.resolve(__dirname, '../node_modules/@ontola'),
            path.resolve(__dirname, '../node_modules/@ontologies'),
            path.resolve(__dirname, '../node_modules/@rdfdev'),
            path.resolve(__dirname, '../node_modules/link-lib'),
            path.resolve(__dirname, '../node_modules/link-redux'),
            path.resolve(__dirname, '../node_modules/ml-disjoint-set'),
            path.resolve(__dirname, '../node_modules/n-quads-parser'),
            path.resolve(__dirname, '../node_modules/react-intl'),
            path.resolve(__dirname, '../node_modules/universal-url'),
            path.resolve(__dirname, '../node_modules/whatwg-url'),
            path.resolve(__dirname, '../node_modules/webidl-conversions'),
          ],
          test: /\.(m?(t|j)sx?)$/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2018',
              tsconfigRaw: require(path.resolve(__dirname, '..', 'app', 'tsconfig.json')),
            },
          }
        },
      ],
    },

    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          legalComments: 'none',
          target: 'es2018',
        }),
      ],
    },

    output: {
      filename: `f_assets/[name]-[chunkhash].${options.buildName}.js`,
      path: path.resolve(__dirname, '..', 'dist'),
      publicPath: '/',
    },

    plugins: [
      new webpack.DefinePlugin({
        __LEGACY__: options.bundle === bundles.legacy,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.ProvidePlugin({
        xmlhttprequest: 'imports?this=>global!exports?global.XMLHttpRequest!global.XMLHttpRequest',
      }),
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
      new ManifestPlugin({
        output: `manifest.${options.bundle}.json`,
        publicPath: '/',
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[path][base].gz[query]',
        minRatio: 0.9,
        test: /\.js$|\.css$|\.html$/,
        threshold: 0,
      }),
      new BrotliPlugin(),
      // new BundleAnalyzerPlugin(),
      bugsnagPlugin,
    ].filter((p) => typeof p !== 'undefined'),

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

if (process.env.TEST_BUILD) {
  module.exports = [
    merge(common, createConfig({
      buildName: `min-${bundles.module}`,
      bundle: bundles.module,
      devtool: 'source-map',
    })),
  ];
} else {
  module.exports = [
    merge(common, createConfig({
      buildName: `min-${bundles.legacy}`,
      bundle: bundles.legacy,
    })),
    merge(common, createConfig({
      buildName: `min-${bundles.module}`,
      bundle: bundles.module,
      devtool: 'source-map',
    })),
  ].filter(Boolean);
}
