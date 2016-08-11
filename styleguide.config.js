const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  title: 'Argu React Style Guide',
  components: './app/components/**/*.jsx',
  serverPort: 5000,
  updateWebpackConfig: function(webpackConfig) { // eslint-disable-line
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
    webpackConfig.postcss = [ // eslint-disable-line
      autoprefixer({ browsers: ['last 2 versions'] }),
    ];
    return webpackConfig;
  },
};
