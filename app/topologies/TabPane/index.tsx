import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { tabPaneTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

const TabPane: TopologyFC = ({ children }) => {
  const [TabPaneTopology, subject] = useTopologyProvider(tabPaneTopology);

  return (
    <TabPaneTopology>
      <div resource={subject?.value}>
        {children}
      </div>
    </TabPaneTopology>
  );
};

export default TabPane;
