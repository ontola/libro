const { spawnSync } = require('child_process');

const versionFromTag = () => {
  const version = process.env.LIBRO_VERSION ?? spawnSync('git', ['describe', '--tags']).stdout.toString('utf8').trim();

  if (version.length === 0) {
    throw new Error('Version is missing');
  }

  return version;
};

module.exports = typeof __VERSION__ !== 'undefined'
  ? __VERSION__
  : versionFromTag();
