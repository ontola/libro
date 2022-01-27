import { createNS } from '@ontologies/core';

const opengov = createNS('http://www.w3.org/ns/opengov#');

export default {
  ns: opengov,

  /* classes */
  // eslint-disable-next-line sort-keys
  Motion: opengov('Motion'),

  /* properties */
  count: opengov('count'),
};
