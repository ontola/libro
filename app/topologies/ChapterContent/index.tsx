import { chapterContentTopology } from '../../topologies';
import Topology from '../Topology';

export class ChapterContent extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = chapterContentTopology;
  }
}
