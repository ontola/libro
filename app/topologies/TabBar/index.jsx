import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import TopologyProvider from '../Topology';
import './TabBar.scss';
import { VerticalScroller } from '../../components';

export const tabBarTopology = NS.argu('tabBar');

class TabBar extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.topology = tabBarTopology;
    this.className = 'TabBar';
  }

  render() {
    if (!this.props.children) {
      return null;
    }

    return this.wrap(subject => (
      <div className="TabBar" resource={subject && subject.value}>
        <VerticalScroller>
          {this.props.children}
        </VerticalScroller>
      </div>
    ));
  }
}

export default TabBar;
