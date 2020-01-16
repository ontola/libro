import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a container
 */
export const containerFloatTopology = argu.ns('containerFloat');

/**
 * Sets the containerFloat topology
 * @returns {component} Component
 */
class ContainerFloat extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'ContainerFloat';
    this.topology = containerFloatTopology;
  }
}

export default ContainerFloat;
