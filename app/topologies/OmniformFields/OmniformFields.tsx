import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

export const omniformFieldsTopology = argu.ns('omniformFields');

class OmniformFields extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = omniformFieldsTopology;
  }

  public render() {
    return this.wrap((
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ));
  }
}

export default OmniformFields;
