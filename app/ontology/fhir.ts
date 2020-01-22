import { createNS } from '@ontologies/core';

const fhir = createNS('http://hl7.org/fhir/');

export default {
  ns: fhir,

  /* properties */
  markdown: fhir('markdown'),
};
