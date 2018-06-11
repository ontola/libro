import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardAppendix extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = NS.argu('cardAppendix');
  }
}

CardAppendix.propTypes = propTypes;

export default CardAppendix;
