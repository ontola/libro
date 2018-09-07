import { TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

class OmniformFields extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('omniformFields');
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
