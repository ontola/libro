import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

/**
 * @deprecated
 */
export const voteEventTopology = NS.argu('voteEvent');

class VoteEvent extends Topology {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.topology = voteEventTopology;
  }
}

export default VoteEvent;
