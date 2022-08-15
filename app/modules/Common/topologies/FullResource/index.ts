import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';
import { fullResourceTopology } from '../index';

const FullResource = createBasicTopologyProvider(fullResourceTopology);

export default FullResource;
