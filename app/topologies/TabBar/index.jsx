import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { NS } from '../../helpers/LinkedRenderStore';
import TopologyProvider from '../Topology';
import { currentLocation } from '../../helpers/paths';

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
    const { children, location } = this.props;

    if (!children) {
      return null;
    }

    return this.wrap(subject => (
      <Tabs
        resource={subject?.value}
        scrollButtons="on"
        value={currentLocation(location).value}
        variant="scrollable"
      >
        {children}
      </Tabs>
    ));
  }
}

export default withRouter(TabBar);
