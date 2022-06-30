import argu from '../../../Argu/lib/argu';
import { createBasicTopologyProvider } from '../../../Core/lib/topology';

export const chapterContentTopology = argu.ns('chapterContent');

export const ChapterContent = createBasicTopologyProvider(chapterContentTopology);

