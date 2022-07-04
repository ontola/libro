import { useTopologyProvider } from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';
import { TabVariant, Tabs } from '../../components/Tabs';

export const tabBarTopology = libro.topologies.tabBar;

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
