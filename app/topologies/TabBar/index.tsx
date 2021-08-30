import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { TabVariant, Tabs } from '../../components/Tabs';
import argu from '../../ontology/argu';
import TopologyProvider from '../Topology';

export const tabBarTopology = argu.ns('tabBar');

interface Props extends RouteComponentProps<any> {
  value: any;
  variant?: TabVariant
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
      variant,
    } = this.props;

    if (!children) {
      return null;
    }

    return this.wrap((subject) => (
      <Tabs
        location={location}
        resource={subject?.value}
        value={value}
        variant={variant}
      >
        {children}
      </Tabs>
    ));
  }
}

export default withRouter(TabBar);
