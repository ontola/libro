import { createNS } from '@ontologies/core';

const qb = createNS('http://purl.org/linked-data/cube#');

export default {
  ns: qb,

  /* classes */
  DataSet: qb('DataSet'),
  MeasureProperty: qb('MeasureProperty'),
  Observation: qb('Observation'),

  /* properties */
  component: qb('component'),
  measure: qb('measure'),
  observation: qb('observation'),
  order: qb('order'),
  structure: qb('structure'),
};
