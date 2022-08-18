import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { cardAppendixTopology } from '../index';

const CardAppendixTopology = createTopologyProvider(cardAppendixTopology);

/**
 * Renders an empty CardAppendix
 */
const CardAppendix: TopologyFC = ({ children }) => (
  <CardAppendixTopology>
    {children}
  </CardAppendixTopology>
);

export default CardAppendix;
