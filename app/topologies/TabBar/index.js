import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './TabBar.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class TabBar extends Topology {
  constructor(props) {
    super(props);

    this.topology = NS.argu('tabBar');
    this.className = 'TabBar';
  }
}

TabBar.propTypes = propTypes;

export { default as Tab } from './Tab';

export default TabBar;
