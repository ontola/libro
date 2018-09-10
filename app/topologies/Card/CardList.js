import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

/**
 * A list inside a CardContent
 */
export const cardListTopology = NS.argu('cardList');

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'CardList';
    this.topology = cardListTopology;
  }
}

export default CardList;
