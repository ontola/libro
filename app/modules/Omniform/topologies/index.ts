import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import omniformFieldsTopologyComponent, { omniformFieldsTopology } from './OmniformFields/OmniformFields';
import omniformSupplementBarTopologyComponent, { omniformSupplementBarTopology } from './OmniformSupplementBar/OmniformSupplementBar';

export const topologyMap: TopologyMap = {
  [rdf.id(omniformFieldsTopology)]: [omniformFieldsTopologyComponent, undefined],
  [rdf.id(omniformSupplementBarTopology)]: [omniformSupplementBarTopologyComponent, undefined],
};

export default [
  omniformFieldsTopology,
  omniformSupplementBarTopology,
];
