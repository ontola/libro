import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

/**
 * In the top right corner of a card
 */
export const cardFloatTopology = NS.argu('cardFloat');

/**
 * Sets the cardFloat topology
 * @returns {component} Component
 */
class CardFloat extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'CardFloat';
    this.topology = cardFloatTopology;
  }
}

export default CardFloat;
