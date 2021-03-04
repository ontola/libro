import { createNS } from '@ontologies/core';

const org = createNS('http://www.w3.org/ns/person#');

export default {
  ns: org,

  /* classes */
  // eslint-disable-next-line sort-keys
  Person: org('Person'),
};
