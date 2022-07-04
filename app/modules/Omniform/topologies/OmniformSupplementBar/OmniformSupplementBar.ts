import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import ontola from '../../../Kernel/ontology/ontola';

export const omniformSupplementBarTopology = ontola.ns('omniformSupplementBar');

const OmniformSupplementBar = createBasicTopologyProvider(omniformSupplementBarTopology);

export default OmniformSupplementBar;
