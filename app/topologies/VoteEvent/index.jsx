import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * @deprecated
 */
export const voteEventTopology = argu.ns('voteEvent');

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
