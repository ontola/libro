import { createNS } from '@ontologies/core';

const opengov = createNS('http://www.w3.org/ns/opengov#');

export default {
  ns: opengov,

  Motion: opengov('Motion'),
};
