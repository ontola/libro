import { createTopologyProvider } from 'link-redux';

import { fullResourceTopology } from '../index';

const FullResource = createTopologyProvider(fullResourceTopology);

export default FullResource;
