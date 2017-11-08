const path = require('path');

const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');

module.exports = {
  // Using the existng webpackConfig would be preferable, since it should prevent a lot of code
  // duplication bewtween this file and common.config.js. However, that did not work.
  // see: https://github.com/styleguidist/react-styleguidist/blob/next/docs/GettingStarted.md
  // webpackConfigFile: './webpack/common.config.js',
  serverPort: 5000,
  sections: [
    {
      name: 'Card Components',
      content: './app/components/Card/Card.md',
      components: './app/components/Card/*.jsx',
    },
  ],
  components: './app/components/**/index.jsx',
  showCode: false,
  webpackConfig: {
    resolve: {
      modules: ['./node_modules'],
      extensions: ['.js', '.jsx', '.ts'],
      alias: {
        components: path.resolve('app/components'),
        containers: path.resolve('app/containers'),
        helpers: path.resolve('app/helpers'),
        models: path.resolve('app/models'),
        react: path.resolve('./node_modules/react'),
        state: path.resolve('app/state'),
      },
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
        }, {
          test: /\.scss$/,
          include: path.join(__dirname, 'app'),
          loader: 'style!css-loader!postcss-loader!sass-loader',
        },
      ],
      plugins: [
        new HappyPack({
          id: 'babel',
          threads: 4,
          loaders: ['babel-loader?cacheDirectory'],
        }),
      ],
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
    entry: [
      path.join(__dirname, 'app/components/shared/styleguide.scss'),
      path.join(__dirname, 'app/components/shared/init.scss'),
    ],
  },
};
