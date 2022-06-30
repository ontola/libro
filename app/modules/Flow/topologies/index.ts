import rdf from '@ontologies/core';

import { TopologyMap } from '../../Core/lib/ontology';

import flowTopologyComponent, { flowTopology } from './Flow';

export const topologyMap: TopologyMap = {
  [rdf.id(flowTopology)]: [flowTopologyComponent, undefined],
};

export default [
  flowTopology,
];
