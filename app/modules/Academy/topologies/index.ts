import rdf from '@ontologies/core';

import { TopologyMap } from '../../Kernel/lib/ontology';

import { ChapterContent, chapterContentTopology } from './ChapterContent';

export const topologyMap: TopologyMap = {
  [rdf.id(chapterContentTopology)]: [ChapterContent, undefined],
};

export default [
  chapterContentTopology,
];