const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
  externals: {
    URL: 'self.URL',
    jsonld: '{}',
    'solid-auth-client': 'self.fetch',
    'universal-url': '{URL: self.URL}',
    'whatwg-url': 'self.URL',
    xmlhttprequest: 'self.XMLHttpRequest',
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.png$/,
        use: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.jpg$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
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
    filename: '[name].bundle.js',
    path: path.resolve(`${__dirname}/../dist/public/`),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch',
      xmlhttprequest: 'imports-loader?this=>global!exports?global.XMLHttpRequest!global.XMLHttpRequest',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __ORIGIN__: JSON.stringify(`https://${process.env.FRONTEND_HOSTNAME}`),
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __TEST__: process.env.NODE_ENV === 'test',
      'process.env': {
        ARGU_API_URL: JSON.stringify(process.env.ARGU_API_URL),
        FRONTEND_HOSTNAME: JSON.stringify(process.env.FRONTEND_HOSTNAME),
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      'process.env.ELASTICSEARCH_URL': JSON.stringify(process.env.ELASTICSEARCH_URL),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

  resolve: {
    alias: {
      components: path.resolve('app/components'),
      containers: path.resolve('app/containers'),
      helpers: path.resolve('app/helpers'),
      models: path.resolve('app/models'),
      react: path.resolve('node_modules/react'),
      state: path.resolve('app/state'),
      static: path.resolve('./static'),
    },
    extensions: ['.js', '.jsx', '.ts'],
    modules: ['./node_modules'],
  },
};

module.exports = common;
