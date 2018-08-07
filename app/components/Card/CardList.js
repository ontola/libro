import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology {
  constructor() {
    super();

    this.className = 'CardList';
    this.topology = NS.argu('cardList');
  }
}

CardList.propTypes = propTypes;

export default CardList;
