import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';


export const cardFixedTopology = NS.argu('cardFixed');

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /** Let the parent define the size entirely. */
    fill: PropTypes.bool,
    fixed: PropTypes.bool,
  };

  static defaultProps = {
    fixed: false,
  };

  constructor(props) {
    super(props);

    this.topology = cardFixedTopology;
  }

  getClassName() {
    return `Card Card--fixed${this.props.fill ? ' Card--fill' : ''}`;
  }
}

export default CardFixed;
