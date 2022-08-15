import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { cardAppendixTopology } from '../index';

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
