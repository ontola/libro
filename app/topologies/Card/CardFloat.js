import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Sets the cardFloat topology
 * @returns {component} Component
 */
class CardFloat extends Topology {
  constructor() {
    super();

    this.className = 'CardFloat';
    this.topology = NS.argu('cardFloat');
  }
}

CardFloat.propTypes = propTypes;

export default CardFloat;
