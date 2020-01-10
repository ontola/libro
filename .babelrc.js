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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-new-target',
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
        ['@babel/preset-env', {
          modules: false,
          targets: {
            node: 11,
          },
        }],
      ],
    },
  }
};
