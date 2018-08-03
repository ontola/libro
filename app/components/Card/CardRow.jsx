import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

const propTypes = {
  children: PropTypes.node.isRequired,
  showArrow: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology {
  constructor() {
    super();

    this.topology = NS.argu('cardRow');
  }

  getClassName() {
    return `CardRow ${this.props.showArrow && 'CardRow--show-arrow'} ${this.props.backdrop && 'CardRow--backdrop'}`;
  }
}

CardRow.propTypes = propTypes;

export default CardRow;
