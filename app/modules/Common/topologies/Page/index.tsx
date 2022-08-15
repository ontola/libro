import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { pageTopology } from '../index';

export const PAGE_CID = 'Page';

const Page: TopologyFC = ({ children }) => {
  const [PageTopology] = useTopologyProvider(pageTopology);

  return (
    <PageTopology>
      <div className={PAGE_CID}>
        {children}
      </div>
    </PageTopology>
  );
};

export default Page;
