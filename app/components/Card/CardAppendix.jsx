import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Renders an empty CardAppendix
 * @returns {component} Component
 */
class CardAppendix extends Topology {
  constructor(props) {
    super(props);

    this.topology = NS.argu('cardAppendix');
  }
}

CardAppendix.propTypes = propTypes;

export default CardAppendix;
