import { topologyMap as academyTopologyMap } from './modules/Academy/topologies/topologyMap';
import { topologyMap as actionTopologyMap } from './modules/Action/topologies/topologyMap';
import { topologyMap as commonTopologyMap } from './modules/Common/topologies/topologyMap';
import { topologyMap as flowTopologyMap } from './modules/Flow/topologies/topologyMap';
import { topologyMap as formTopologyMap } from './modules/Form/topologies/topologyMap';
import { TopologyMap } from './modules/Kernel/lib/ontology';
import { topologyMap as menuTopologyMap } from './modules/Menu/topologies/topologyMap';
import { topologyMap as navbarTopologyMap } from './modules/NavBar/topologies/topologyMap';
import { topologyMap as omniformTopologyMap } from './modules/Omniform/topologies/topologyMap';
import { topologyMap as salesTopologyMap } from './modules/SalesWebsite/topologies/topologyMap';
import { topologyMap as tableTopologyMap } from './modules/Table/topologies/topologyMap';

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
