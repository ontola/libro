import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const cardVoteEventTopology = NS.argu('cardVoteEvent');

class CardVoteEvent extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = cardVoteEventTopology;
  }
}

export default CardVoteEvent;
