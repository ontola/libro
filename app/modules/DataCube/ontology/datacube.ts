import { createNS } from '@ontologies/core';

const datacube = createNS('http://purl.org/linked-data/cube#');

export default {
  ns: datacube,

  /* classes */
  // eslint-disable-next-line sort-keys
  DataSet: datacube('DataSet'),
  MeasureProperty: datacube('MeasureProperty'),
  Observation: datacube('Observation'),

  /* properties */
  component: datacube('component'),
  measure: datacube('measure'),
  observation: datacube('observation'),
  order: datacube('order'),
  structure: datacube('structure'),
};
