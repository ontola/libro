const path = require('path');

module.exports = {
  background_color: '#eef0f2',
  display: 'standalone',
  filename: 'manifest.json',
  icons: [
    {
      sizes: [96, 128, 192, 256, 384, 512, 1024], // eslint-disable-line no-magic-numbers
      src: path.resolve('app/assets/logo-social.png'),
      type: 'image/png',
    },
  ],
  ios: true,
  lang: 'nl-NL',
  name: 'Argu',
  serviceworker: {
    scope: '/',
    src: 'sw.js',
  },
  short_name: 'Argu',
  start_url: '/',
  theme_color: '#60707F',
};
