import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * A list inside a CardContent
 */
export const cardListTopology = argu.cardList;

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['column']),
  };

  constructor(props) {
    super(props);

    this.topology = cardListTopology;
  }

  getClassName() {
    return `CardList ${this.props.direction === 'column' ? 'CardList--column' : ''}`;
  }
}

export default CardList;
