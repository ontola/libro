import { createNS } from '@ontologies/core';

const org = createNS('http://www.w3.org/ns/person#');

export default {
  ns: org,

  /* classes */
  Person: org('Person'),
};
