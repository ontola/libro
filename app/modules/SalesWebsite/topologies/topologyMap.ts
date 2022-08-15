import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import BlueBlock from './BlueBlock';
import Showcase from './Showcase';

import { blueBlockTopology, showcaseTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(blueBlockTopology)]: [BlueBlock, undefined],
  [rdf.id(showcaseTopology)]: [Showcase, undefined],
};
