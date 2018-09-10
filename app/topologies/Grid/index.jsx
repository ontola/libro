import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './Grid.scss';

export const gridTopology = NS.argu('grid');

class Grid extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.topology = gridTopology;
    this.className = 'Grid';
  }
}

export default Grid;
