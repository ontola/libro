import argu from '../../ontology/argu';
import Topology from '../Topology';

export const chapterContentToplogy = argu.ns('chapterContent');

export class ChapterContent extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = chapterContentToplogy;
  }
}
