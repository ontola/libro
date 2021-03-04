import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const parentTopology = argu.ns('parent');

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
