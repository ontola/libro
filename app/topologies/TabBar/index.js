import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './TabBar.scss';

export const tabBarTopology = NS.argu('tabBar');

class TabBar extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = tabBarTopology;
    this.className = 'TabBar';
  }
}

export default TabBar;
