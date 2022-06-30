import rdf from '@ontologies/core';

import { TopologyMap } from '../../Core/lib/ontology';

import BlueBlock, { blueBlockTopology } from './BlueBlock';
import Showcase, { showcaseTopology } from './Showcase';

export const topologyMap: TopologyMap = {
  [rdf.id(blueBlockTopology)]: [BlueBlock, undefined],
  [rdf.id(showcaseTopology)]: [Showcase, undefined],
};

export default [
  blueBlockTopology,
  showcaseTopology,
];
