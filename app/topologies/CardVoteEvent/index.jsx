import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardVoteEventTopology = argu.ns('cardVoteEvent');

class CardVoteEvent extends Topology {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.topology = cardVoteEventTopology;
  }
}

export default CardVoteEvent;
