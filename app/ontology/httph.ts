import { createNS } from '@ontologies/core';

const httph = createNS('http://www.w3.org/2007/ont/httph#');

export default {
  'ns': httph,

  /* properties */
  'exec-action': httph('exec-action'),
};
