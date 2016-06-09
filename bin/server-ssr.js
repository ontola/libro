const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./.babelrc'));

// Ignore scss, remove prop-types, webpack alias
const ignore = [
  [
    'babel-plugin-transform-require-ignore', {
      extensions: ['.scss'],
    },
  ],
  'react-remove-prop-types', ['babel-plugin-webpack-alias', {
    config: __dirname + '/../webpack/common.config.js',
  }],
];

config.plugins = config.plugins.concat(ignore);
require('babel-core/register')(config);

global.__CLIENT__ = false;

require('../server/server-ssr.js');
