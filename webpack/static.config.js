const path = require('path');

const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const pjson = require('../package.json');
const babelrc = require('../.babelrc');
const { bundles } = require('../bundleConfig');

const common = require('./common.config');
const manifest = require('./manifest.json');

let bugsnagPlugin;
if (process.env.SEMAHORE_DEPLOY_NUMBER) {
  bugsnagPlugin = new BugsnagBuildReporterPlugin({
    apiKey: process.env.BUGSNAG_KEY,
    appVersion: pjson.version,
    releaseStage: process.env.SEMAPHORE_SERVER_NAME,
  });
}

const babelEnvOpts = {
  legacy: {
    env: {
      corejs: 3,
      modules: false,
      targets: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'Firefox ESR',
          'ie 11',
        ],
      },
      useBuiltIns: 'entry',
    },
    plugins: [
      ['@babel/transform-runtime', {
        regenerator: true,
      }],
    ],
  },
  module: {
    env: {
      modules: false,
      targets: {
        browsers: [
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15',
        ],
      },
      useBuiltIns: false,
    },
    plugins: [],
  },
};

function createConfig(options) {
  let babelLoader = ['babel-loader'];
  if (babelEnvOpts[options.bundle]) {
    babelLoader = [{
      loader: 'babel-loader',
      options: {
        ...babelrc,
        babelrc: false,
        plugins: [
          ...babelEnvOpts[options.bundle].plugins,
          ...babelrc.plugins,
        ],
        presets: [
          '@babel/preset-react',
          '@babel/preset-typescript',
          ['@babel/preset-env', babelEnvOpts[options.bundle].env],
        ],
      },
    }];
  }

  return {
    devtool: 'cheap-source-map',

    entry: {
      main: './app/index.jsx',
    },

    module: {
      rules: [
        {
          include: [
            path.resolve(__dirname, '../app'),
            path.resolve(__dirname, '../node_modules/whatwg-url'),
            path.resolve(__dirname, '../node_modules/universal-url'),
            path.resolve(__dirname, '../node_modules/webidl-conversions'),
            path.resolve(__dirname, '../node_modules/ml-disjoint-set'),
            path.resolve(__dirname, '../node_modules/link-lib'),
            path.resolve(__dirname, '../node_modules/link-redux'),
            path.resolve(__dirname, '../node_modules/n-quads-parser'),
          ],
          test: /\.(m?(t|j)sx?)$/,
          use: babelLoader,
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
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
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
        __LEGACY__: options.bundle === bundles.legacy,
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
      new WebpackPwaManifest(manifest),
      new ManifestPlugin({
        fileName: `../private/manifest.${options.buildName}.json`,
        publicPath: '/',
      }),
      new CompressionPlugin({
        minRatio: 0.9,
      }),
      new BrotliPlugin(),
      // new BundleAnalyzerPlugin(),
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

if (process.env.TEST_BUILD) {
  module.exports = [
    merge(common, createConfig({
      buildName: `min-${bundles.module}`,
      bundle: bundles.module,
      hostname: process.env.FRONTEND_HOSTNAME || 'argu.co',
    })),
  ];
} else {
  module.exports = [
    merge(common, createConfig({
      buildName: `min-${bundles.module}`,
      bundle: bundles.module,
      hostname: process.env.FRONTEND_HOSTNAME || 'argu.co',
    })),
    merge(common, createConfig({
      buildName: `min-${bundles.legacy}`,
      bundle: bundles.legacy,
      hostname: process.env.FRONTEND_HOSTNAME || 'argu.co',
    })),
    merge(common, createConfig({
      buildName: `localtest-${bundles.module}`,
      bundle: bundles.module,
      hostname: 'app.argu.localtest',
    })),
    merge(common, createConfig({
      buildName: `localtest-${bundles.legacy}`,
      bundle: bundles.legacy,
      hostname: 'app.argu.localtest',
    })),
    merge(common, createConfig({
      buildName: `localdev-${bundles.module}`,
      bundle: bundles.module,
      hostname: 'app.argu.localdev',
    })),
  ];
}
