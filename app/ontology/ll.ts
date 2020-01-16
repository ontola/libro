import { createNS } from '@ontologies/core';

const ll = createNS('http://purl.org/link-lib/');

export default {
  ns: ll,

  /* classes */
  ErrorResource: ll('ErrorResource'),
  LoadingResource: ll('LoadingResource'),

  /* properties */
  actionBody: ll('actionBody'),
  /** @deprecated use {ld.add} instead */
  add: ll('add'),
  blob: ll('blob'),
  /** @deprecated use {ld.purge} instead */
  purge: ll('purge'),
  /** @deprecated use {ld.remove} instead */
  remove: ll('remove'),
  /** @deprecated use {ld.replace} instead */
  replace: ll('replace'),
  /** @deprecated use {ld.slice} instead */
  slice: ll('slice'),
  /** @deprecated use {ld.supplant} instead */
  supplant: ll('supplant'),
};
