import { createNS } from '@ontologies/core';

const sp = createNS('http://spinrdf.org/sp#');

export default {
  ns: sp,

  // eslint-disable-next-line sort-keys
  Variable: sp('Variable'),
};
