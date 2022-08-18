import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { TabVariant, Tabs } from '../../components/Tabs';
import { tabBarTopology } from '../index';

interface TabBarProps {
  value: any;
  variant?: TabVariant;
}

const TabBarTopology = createTopologyProvider(tabBarTopology);

const TabBar: TopologyFC<TabBarProps> = ({ children, value, variant }) => {
  const { subject } = useLinkRenderContext();
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
