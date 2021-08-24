import { createNS } from '@ontologies/core';

const dcat = createNS('http://www.w3.org/ns/dcat#');

export default {
  ns: dcat,

  /* properties */
  // eslint-disable-next-line sort-keys
  accessURL: dcat('accessURL'),
  distribution: dcat('distribution'),
  theme: dcat('theme'),
};
