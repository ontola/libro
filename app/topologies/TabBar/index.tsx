import React, { ChildrenProp } from 'react';
import { useLocation } from 'react-router';
import type { Location } from 'history';

import { TabVariant, Tabs } from '../../components/Tabs';
import { tabBarTopology } from '../../topologies';
import TopologyProvider from '../Topology';

interface TabBarProps {
  value: any;
  variant?: TabVariant;
  location: Location;
}

class TabBarImpl extends TopologyProvider<TabBarProps> {
  constructor(props: TabBarProps) {
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

const TabBar = ({ children, ...props }: Omit<TabBarProps, 'location'> & ChildrenProp): JSX.Element => {
  const location = useLocation();

  return (
    <TabBarImpl
      location={location}
      {...props}
    >
      {children}
    </TabBarImpl>
  );
};

export default TabBar;
