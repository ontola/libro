import rdf from '@ontologies/core';

import { TopologyMap } from '../../Core/lib/ontology';

import actionsBarTopologyComponent, { actionsBarTopology } from './ActionsBar';

export const topologyMap: TopologyMap = {
  [rdf.id(actionsBarTopology)]: [actionsBarTopologyComponent, undefined],
};

export default [
  actionsBarTopology,
];
