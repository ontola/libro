import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './Grid.scss';

class Grid extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('grid');
    this.className = 'Grid';
  }
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;
