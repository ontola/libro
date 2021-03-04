import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardMainTopology = argu.cardMain;

interface PropTypes {
  fixed?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology<PropTypes> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardMainTopology;
  }

  public getClassName(): string {
    return clsx({
      'Card': true,
      'Card--fixed': this.props.fixed,
    });
  }
}

export default CardMain;
