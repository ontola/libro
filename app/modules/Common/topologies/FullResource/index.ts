import { createBasicTopologyProvider } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const fullResourceTopology = libro.topologies.fullResource;

const FullResource = createBasicTopologyProvider(fullResourceTopology);

export default FullResource;
