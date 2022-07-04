import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';
import formFooterTopologyComponent from '../../Form/topologies/FormFooter';

import appMenuTopologyComponent, { appMenuTopology } from './AppMenu';
import { menuTopology } from './Menu';

export const topologyMap: TopologyMap = {
  [rdf.id(appMenuTopology)]: [appMenuTopologyComponent, undefined],
  [rdf.id(menuTopology)]: [formFooterTopologyComponent, undefined],
};

export default [
  appMenuTopology,
  menuTopology,
];
