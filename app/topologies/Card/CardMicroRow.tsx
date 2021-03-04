import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardMicroRowTopology = argu.ns('cardMicroRow');

interface PropTypes {
  highlighted?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = cardMicroRowTopology;
  }

  public getClassName(): string {
    return `CardMicroRow ${this.props.highlighted ? 'CardMicroRow--shine' : ''}`;
  }
}

export default CardMicroRow;
