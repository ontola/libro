import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardRowTopology = argu.ns('cardRow');

interface PropTypes {
  backdrop?: boolean;
  noBorder?: boolean;
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

  public getClassName() {
    return clsx({
      'CardRow': true,
      'CardRow--backdrop': this.props.backdrop,
      'CardRow--no-border': this.props.noBorder,
      'CardRow--show-arrow': this.props.showArrow,
    });
  }
}

export default CardRow;
