import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export const omniformFieldsTopology = argu.ns('omniformFields');

class OmniformFields extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = omniformFieldsTopology;
  }

  public render() {
    return this.wrap(this.props.children);
  }
}

export default OmniformFields;
