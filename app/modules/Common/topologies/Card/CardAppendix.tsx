import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const cardAppendixTopology = libro.topologies.cardAppendix;

/**
 * Renders an empty CardAppendix
 */
const CardAppendix: TopologyFC = ({ children }) => {
  const [CardAppendixTopology] = useTopologyProvider(cardAppendixTopology);

  return (
    <CardAppendixTopology>
      {children}
    </CardAppendixTopology>
  );
};

export default CardAppendix;
