import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const fullResourceTopology = libro.topologies.fullResource;

const FullResource = createBasicTopologyProvider(fullResourceTopology);

export default FullResource;
