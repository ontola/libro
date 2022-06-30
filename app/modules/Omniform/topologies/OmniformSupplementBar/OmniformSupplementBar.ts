import { createBasicTopologyProvider } from '../../../Core/lib/topology';
import ontola from '../../../Core/ontology/ontola';

export const omniformSupplementBarTopology = ontola.ns('omniformSupplementBar');

const OmniformSupplementBar = createBasicTopologyProvider(omniformSupplementBarTopology);

export default OmniformSupplementBar;
