import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const parentTopology = argu.ns('parent');

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
