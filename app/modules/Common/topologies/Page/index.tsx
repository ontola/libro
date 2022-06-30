import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const pageTopology = libro.topologies.page;

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
