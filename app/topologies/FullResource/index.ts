import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export const fullResourceTopology = argu.fullResource;

class FullResource extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = fullResourceTopology;
  }
}

export default FullResource;
