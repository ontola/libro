import PropTypes from 'prop-types';

import Topology from '../Topology';

export const primaryResourceTopology = null;

class PrimaryResource extends Topology {
  static displayName = 'PrimaryResource';

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'PrimaryResource';
    this.topology = primaryResourceTopology;
  }
}

export default PrimaryResource;
