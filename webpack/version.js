const { spawnSync } = require('child_process');

module.exports = typeof __VERSION__ !== 'undefined'
  ? __VERSION__
  : spawnSync('git', ['describe', '--tags']).stdout.toString('utf8').trim();
