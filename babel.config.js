const babelrc = require('./.babelrc');

module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/preset-env', {
      corejs: '3',
      modules: 'commonjs',
      targets: {
        node: 'current',
      },
      useBuiltIns: 'entry',
    }],
  ];
  const plugins = [
    'babel-plugin-dynamic-import-node',
    '@babel/plugin-transform-runtime',
    ...babelrc.plugins,
  ];

  return {
    env: babelrc.env,
    plugins,
    presets,
  };
};
