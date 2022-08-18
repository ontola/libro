import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { pageTopology } from '../index';

export const PAGE_CID = 'Page';

const PageTopology = createTopologyProvider(pageTopology);

const Page: TopologyFC = ({ children }) => (
  <PageTopology>
    <div className={PAGE_CID}>
      {children}
    </div>
  </PageTopology>
);

export default Page;
