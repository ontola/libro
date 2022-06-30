import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

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
