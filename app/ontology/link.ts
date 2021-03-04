import { createNS } from '@ontologies/core';

const link = createNS('http://www.w3.org/2007/ont/link#');

export default {
  ns: link,

  /* classes */
  // eslint-disable-next-line sort-keys
  Document: link('Document'),
};
