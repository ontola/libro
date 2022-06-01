import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { cardAppendixTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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
