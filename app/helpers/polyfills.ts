import '@formatjs/intl-relativetimeformat/polyfill';
import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';
import 'core-js/features/array/from';
import 'intl-pluralrules';
import { polyfill } from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  polyfill();
}
