import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardAppendixTopology = argu.ns('cardAppendix');

/**
 * Renders an empty CardAppendix
 * @returns {component} Component
 */
class CardAppendix extends Topology {
  constructor(props: {}) {
    super(props);

    this.topology = cardAppendixTopology;
  }
}

export default CardAppendix;