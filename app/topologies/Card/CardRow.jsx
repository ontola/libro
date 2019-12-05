import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    noBorder: PropTypes.bool,
    showArrow: PropTypes.bool,
  };

  constructor() {
    super();

    this.topology = cardRowTopology;
  }

  getClassName() {
    return classNames({
      CardRow: true,
      'CardRow--backdrop': this.props.backdrop,
      'CardRow--no-border': this.props.noBorder,
      'CardRow--show-arrow': this.props.showArrow,
    });
  }
}

export default CardRow;
