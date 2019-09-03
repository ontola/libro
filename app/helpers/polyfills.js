/* eslint-disable global-require */
import '@formatjs/intl-relativetimeformat/polyfill';
import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';
import 'core-js/features/array/from';
import 'intl-pluralrules';

// Removes the rubber banding in iOS
require('inobounce');
require('smoothscroll-polyfill').polyfill();
