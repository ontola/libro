import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardFixedTopology = argu.cardFixed;

interface PropTypes {
  fill?: boolean;
  fixed?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology<PropTypes> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardFixedTopology;
  }

  public getClassName(): string {
    return `Card Card--fixed${this.props.fill ? ' Card--fill' : ''}`;
  }
}

export default CardFixed;
