import rdf from '@ontologies/core';

import formFooterTopologyComponent from '../../Form/topologies/FormFooter';
import { TopologyMap } from '../../Kernel/lib/ontology';

import appMenuTopologyComponent from './AppMenu';

import { appMenuTopology, menuTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(appMenuTopology)]: [appMenuTopologyComponent, undefined],
  [rdf.id(menuTopology)]: [formFooterTopologyComponent, undefined],
};
