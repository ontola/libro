import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './index.scss';

export const fullResourceTopology = argu.fullResource;

class FullResource extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: {}) {
    super(props);

    this.topology = fullResourceTopology;
    this.className = 'FullResource';
  }
}

export default FullResource;
