import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import flowTopologyComponent from './Flow';

import { flowTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(flowTopology)]: [flowTopologyComponent, undefined],
};
