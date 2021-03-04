import { createNS } from '@ontologies/core';

const hydra = createNS('http://www.w3.org/ns/hydra/core#');

export default {
  ns: hydra,

  /* classes */
  // eslint-disable-next-line sort-keys
  Collection: hydra('Collection'),

  /* properties */
  operation: hydra('operation'),
};
