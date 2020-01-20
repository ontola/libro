import { createNS } from '@ontologies/core';
import { frontendIRIStr } from '../middleware/app';

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);

export default {
  ns: app,

  /* classes */
  AppSignIn: app('AppSignIn'),
  AppSignOut: app('AppSignOut'),

  /* properties */
  c_a: app('c_a'),
  menu: app('menu'),
  n: app('n'),
  omniform: app('omniform'),
  policy: app('policy'),
  privacy: app('privacy'),
  search: app('search'),
};