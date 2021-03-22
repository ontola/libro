import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardRowTopology = argu.ns('cardRow');

interface PropTypes {
  backdrop?: boolean;
  borderTop?: boolean;
  showArrow?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = cardRowTopology;
  }

  public getClassName(): string {
    return clsx({
      'CardRow': true,
      'CardRow--backdrop': this.props.backdrop,
      'CardRow--border-top': this.props.borderTop,
      'CardRow--show-arrow': this.props.showArrow,
    });
  }
}

export default CardRow;
