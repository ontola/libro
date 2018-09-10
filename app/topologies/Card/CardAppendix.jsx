import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './Card.scss';

export const cardAppendixTopology = NS.argu('cardAppendix');

/**
 * Renders an empty CardAppendix
 * @returns {component} Component
 */
class CardAppendix extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = cardAppendixTopology;
  }
}

export default CardAppendix;
