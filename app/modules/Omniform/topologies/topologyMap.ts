import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import omniformFieldsTopologyComponent from './OmniformFields/OmniformFields';
import omniformSupplementBarTopologyComponent from './OmniformSupplementBar/OmniformSupplementBar';

import { omniformFieldsTopology, omniformSupplementBarTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(omniformFieldsTopology)]: [omniformFieldsTopologyComponent, undefined],
  [rdf.id(omniformSupplementBarTopology)]: [omniformSupplementBarTopologyComponent, undefined],
};
