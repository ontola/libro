const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./common.config');

module.exports = merge(common, {
  cache: true,

  devtool: 'eval-cheap-source-map',

  entry: [
    'webpack-hot-middleware/client',
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
        use: ['babel-loader'],
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
    new webpack.DefinePlugin({
      __LEGACY__: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
});
