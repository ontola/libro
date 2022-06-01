import { useTopologyProvider } from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { TabVariant, Tabs } from '../../modules/Common/components/Tabs';
import { tabBarTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

interface TabBarProps {
  value: any;
  variant?: TabVariant;
}

const TabBar: TopologyFC<TabBarProps> = ({ children, value, variant }) => {
  const [TabBarTopology, subject] = useTopologyProvider(tabBarTopology);
  const location = useLocation();

  return (
    <TabBarTopology>
      <div
        className="TabBar"
        resource={subject?.value}
      >
        <Tabs
          location={location}
          resource={subject?.value}
          value={value}
          variant={variant}
        >
          {children}
        </Tabs>
      </div>
    </TabBarTopology>
  );
};

export default TabBar;
