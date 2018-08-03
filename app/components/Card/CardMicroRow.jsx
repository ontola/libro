import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

const propTypes = {
  children: PropTypes.node.isRequired,
  highlighted: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology {
  constructor() {
    super();

    this.topology = NS.argu('cardRow');
  }

  getClassName() {
    return `CardMicroRow ${this.props.highlighted ? 'CardMicroRow--shine' : ''}`;
  }
}

CardMicroRow.propTypes = propTypes;

export default CardMicroRow;
