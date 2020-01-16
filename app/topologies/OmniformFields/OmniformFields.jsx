import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

export const omniformFieldsTopology = argu.ns('omniformFields');

class OmniformFields extends TopologyProvider {
  constructor() {
    super();

    this.topology = omniformFieldsTopology;
  }

  render() {
    return this.wrap((
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ));
  }
}

export default OmniformFields;
