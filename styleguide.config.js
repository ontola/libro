const path = require('path');
const webpackCommonConfig = require('./webpack/common.config.js');

module.exports = {
  title: 'Argu React Style Guide',
  components: './app/components/**/*.jsx',
  serverPort: 5000,
  sections: [
    {
      name: 'Card Components',
      content: './app/components/Card/Card.md',
      components: './app/components/Card/*.jsx',
    },
  ],
  updateWebpackConfig: (webpackConfig => {
    Object.assign(webpackConfig.resolve.alias, webpackCommonConfig.resolve.alias);
    webpackConfig.entry.push(path.join(__dirname, 'app/components/shared/styleguide.scss'));
    webpackConfig.entry.unshift(path.join(__dirname, 'app/components/shared/init.scss'));
    webpackConfig.module.loaders.push({
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'app'),
      loader: 'style!css-loader!postcss-loader!sass-loader',
    });
    return webpackConfig;
  }),
};
