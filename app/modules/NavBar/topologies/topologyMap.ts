import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import navbarTopologyComponent from './Navbar';

import { navbarTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(navbarTopology)]: [navbarTopologyComponent, undefined],
};
