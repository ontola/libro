import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a card
 */
export const cardFloatTopology = argu.ns('cardFloat');

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
