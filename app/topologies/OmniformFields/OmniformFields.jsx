import { TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

export const omniformFieldsTopology = NS.argu('omniformFields');

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
