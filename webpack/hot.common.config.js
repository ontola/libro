const config = require('./common.config.babel.js');

config.plugins.push(
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
);

module.exports = config;