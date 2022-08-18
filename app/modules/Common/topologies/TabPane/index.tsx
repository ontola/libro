import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { tabPaneTopology } from '../index';

const TabPaneTopology = createTopologyProvider(tabPaneTopology);

const TabPane: TopologyFC = ({ children }) => {
  const { subject } = useLinkRenderContext();

  return (
    <TabPaneTopology>
      <div resource={subject?.value}>
        {children}
      </div>
    </TabPaneTopology>
  );
};

export default TabPane;
