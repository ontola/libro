import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import actionsBarTopologyComponent from './ActionsBar';

import { actionsBarTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(actionsBarTopology)]: [actionsBarTopologyComponent, undefined],
};
