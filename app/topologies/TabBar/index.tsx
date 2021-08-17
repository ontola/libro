import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { currentLocationControl } from '../../helpers/paths';
import argu from '../../ontology/argu';
import TopologyProvider from '../Topology';

export const tabBarTopology = argu.ns('tabBar');

interface Props extends RouteComponentProps<any> {
  value: any;
}

class TabBar extends TopologyProvider<Props> {
  constructor(props: Props) {
    super(props);

    this.topology = tabBarTopology;
    this.className = 'TabBar';
  }

  public render() {
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
        value={value || currentLocationControl(location).value}
        variant="scrollable"
      >
        {children}
      </Tabs>
    ));
  }
}

export default withRouter(TabBar);
