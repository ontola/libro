import PropTypes from 'prop-types';

import { parentTopology } from '../../topologies';
import Topology from '../Topology';

class Parent extends Topology {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = parentTopology;
  }
}

export default Parent;
