import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { tabPaneTopology } from '../index';

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
