const path = require('path');

const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');

module.exports = {
  // Using the existng webpackConfig would be preferable, since it should prevent a lot of code
  // duplication bewtween this file and common.config.js. However, that did not work.
  // see: https://github.com/styleguidist/react-styleguidist/blob/next/docs/GettingStarted.md
  // webpackConfigFile: './webpack/common.config.js',
  components: './app/components/**/index.jsx',
  sections: [
    {
      components: './app/components/Card/*.jsx',
      content: './app/components/Card/Card.md',
      name: 'Card Components',
    },
  ],
  serverPort: 5000,
  showCode: false,
  webpackConfig: {
    entry: [
      path.join(__dirname, 'app/components/shared/styleguide.scss'),
      path.join(__dirname, 'app/components/shared/init.scss'),
    ],
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          include: path.join(__dirname, 'app'),
          loader: 'babel',
          test: /\.jsx?$/,
        }, {
          include: path.join(__dirname, 'app'),
          loader: 'style!css-loader!postcss-loader!sass-loader',
          test: /\.scss$/,
        },
      ],
      plugins: [
        new HappyPack({
          id: 'babel',
          loaders: ['babel-loader?cacheDirectory'],
          threads: 4,
        }),
      ],
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
    resolve: {
      alias: {
        components: path.resolve('app/components'),
        containers: path.resolve('app/containers'),
        helpers: path.resolve('app/helpers'),
        models: path.resolve('app/models'),
        react: path.resolve('./node_modules/react'),
        state: path.resolve('app/state'),
      },
      extensions: ['.js', '.jsx', '.ts'],
      modules: ['./node_modules'],
    },
  },
};
