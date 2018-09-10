import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const parentTopology = NS.argu('parent');

class Parent extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.topology = parentTopology;
  }
}

export default Parent;
