import { createNS } from '@ontologies/core';

const ll = createNS('http://purl.org/link-lib/');

/** @deprecated use {ld} instead */
export default {
  ns: ll,

  add: ll('add'),
  purge: ll('purge'),
  remove: ll('remove'),
  replace: ll('replace'),
  slice: ll('slice'),
  supplant: ll('supplant'),
};
