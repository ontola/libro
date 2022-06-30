import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

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
