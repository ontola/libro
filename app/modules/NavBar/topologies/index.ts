import rdf from '@ontologies/core';

import { TopologyMap } from '../../Core/lib/ontology';

import navbarTopologyComponent, { navbarTopology } from './Navbar';

export const topologyMap: TopologyMap = {
  [rdf.id(navbarTopology)]: [navbarTopologyComponent, undefined],
};

export default [
  navbarTopology,
];
