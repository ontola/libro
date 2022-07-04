import argu from '../../../Argu/ontology/argu';
import { createBasicTopologyProvider } from '../../../Kernel/lib/topology';

export const chapterContentTopology = argu.ns('chapterContent');

export const ChapterContent = createBasicTopologyProvider(chapterContentTopology);

