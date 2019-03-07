const { moduleBrowsers } = require('./bundleConfig');

module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: moduleBrowsers,
      },
      useBuiltIns: false,
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/proposal-class-properties',
    '@babel/syntax-dynamic-import',
    '@babel/transform-new-target',
    'add-react-displayname',
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel',
      ],
    },
    production: {
      plugins: [
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-new-target',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-modules-commonjs',
      ],
      presets: [
        '@babel/preset-react',
      ],
    },
  }
};
