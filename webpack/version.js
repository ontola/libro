const { spawnSync } = require('child_process');

const versionFromEnvOrTag = () => {
  if (process.env.LIBRO_VERSION) {
    return [process.env.LIBRO_VERSION, ''];
  }

  const cmd = spawnSync('git', ['describe', '--tags', '--always']);

  return [cmd.stdout.toString('utf8').trim(), cmd.stderr.toString('utf8').trim()];
}

const validatedVersion = () => {
  const [version, err] = versionFromEnvOrTag();

  if (version.length === 0) {
    throw new Error(`Version is missing (${err})`);
  }

  return version;
};

module.exports = typeof __VERSION__ !== 'undefined'
  ? __VERSION__
  : validatedVersion();
