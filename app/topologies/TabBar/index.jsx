import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import argu from '../../ontology/argu';
import TopologyProvider from '../Topology';
import { currentLocation } from '../../helpers/paths';

export const tabBarTopology = argu.ns('tabBar');

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
    const {
      children,
      location,
      value,
    } = this.props;

    if (!children) {
      return null;
    }

    return this.wrap((subject) => (
      <Tabs
        resource={subject?.value}
        scrollButtons="on"
        value={value || currentLocation(location).value}
        variant="scrollable"
      >
        {children}
      </Tabs>
    ));
  }
}

export default withRouter(TabBar);
