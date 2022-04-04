import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { fullResourceTopology } from '../../topologies';

class FullResource extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = fullResourceTopology;
  }
}

export default FullResource;
