import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const tabPaneTopology = libro.topologies.tabPane;

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
