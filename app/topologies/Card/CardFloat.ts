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
  constructor(props: {}) {
    super(props);

    this.className = 'CardFloat';
    this.topology = cardFloatTopology;
  }
}

export default CardFloat;
