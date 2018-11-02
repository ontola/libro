import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const cardRowTopology = NS.argu('cardRow');

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology {
  static propTypes = {
    backdrop: PropTypes.bool,
    children: PropTypes.node.isRequired,
    showArrow: PropTypes.bool,
  };

  constructor() {
    super();

    this.topology = cardRowTopology;
  }

  getClassName() {
    return `CardRow ${this.props.showArrow && 'CardRow--show-arrow'} ${this.props.backdrop && 'CardRow--backdrop'}`;
  }
}

export default CardRow;
