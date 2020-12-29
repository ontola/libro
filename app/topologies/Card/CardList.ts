import argu from '../../ontology/argu';
import Topology from '../Topology';

interface PropTypes {
  direction: 'column' | undefined;
}

/**
 * A list inside a CardContent
 */
export const cardListTopology = argu.cardList;

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = cardListTopology;
  }

  public getClassName() {
    return `CardList ${this.props.direction === 'column' ? 'CardList--column' : ''}`;
  }
}

export default CardList;
