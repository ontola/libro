import { topologyMap as academyTopologyMap } from './modules/Academy/topologies';
import { topologyMap as actionTopologyMap } from './modules/Action/topologies';
import { topologyMap as commonTopologyMap } from './modules/Common/topologies';
import { TopologyMap } from './modules/Kernel/lib/ontology';
import { topologyMap as flowTopologyMap } from './modules/Flow/topologies';
import { topologyMap as formTopologyMap } from './modules/Form/topologies';
import { topologyMap as menuTopologyMap } from './modules/Menu/topologies';
import { topologyMap as navbarTopologyMap } from './modules/NavBar/topologies';
import { topologyMap as omniformTopologyMap } from './modules/Omniform/topologies';
import { topologyMap as salesTopologyMap } from './modules/SalesWebsite/topologies';
import { topologyMap as tableTopologyMap } from './modules/Table/topologies';

const topologyMap: TopologyMap = {
  ...academyTopologyMap,
  ...actionTopologyMap,
  ...commonTopologyMap,
  ...flowTopologyMap,
  ...formTopologyMap,
  ...menuTopologyMap,
  ...navbarTopologyMap,
  ...omniformTopologyMap,
  ...salesTopologyMap,
  ...tableTopologyMap,
};

export default topologyMap;
