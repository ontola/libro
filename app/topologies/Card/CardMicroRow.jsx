import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const cardMicroRowTopology = NS.argu('cardMicroRow');

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    highlighted: PropTypes.bool,
  };

  constructor() {
    super();

    this.topology = cardMicroRowTopology;
  }

  getClassName() {
    return `CardMicroRow ${this.props.highlighted ? 'CardMicroRow--shine' : ''}`;
  }
}

export default CardMicroRow;
