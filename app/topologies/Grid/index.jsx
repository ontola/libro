import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './Grid.scss';

export const gridTopology = argu.grid;

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
