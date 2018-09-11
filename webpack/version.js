const { spawnSync } = require('child_process');

module.exports = spawnSync('git', ['describe', '--tags']).stdout.toString('utf8').trim();
