import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology {
  constructor(props) {
    super(props);

    this.topology = NS.argu('cardFixed');
    this.className = 'Card Card--fixed';
  }
}

CardFixed.propTypes = propTypes;
CardFixed.defaultProps = defaultProps;

export default CardFixed;
