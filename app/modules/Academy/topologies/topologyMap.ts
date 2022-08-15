import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import { ChapterContent } from './ChapterContent';

import { chapterContentTopology } from './index';

export const topologyMap: TopologyMap = {
  [rdf.id(chapterContentTopology)]: [ChapterContent, undefined],
};
