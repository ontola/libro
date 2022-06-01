import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { pageTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

export const PAGE_CID = 'Page';

export const Page: TopologyFC = ({ children }) => {
  const [PageTopology] = useTopologyProvider(pageTopology);

  return (
    <PageTopology>
      <div className={PAGE_CID}>
        {children}
      </div>
    </PageTopology>
  );
};
