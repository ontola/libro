import { TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

export const omniformSupplementBarTopology = NS.argu('omniformSupplementBar');

class OmniformSupplementBar extends TopologyProvider {
  constructor() {
    super();

    this.topology = omniformSupplementBarTopology;
  }

  render() {
    return this.wrap((
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ));
  }
}

export default OmniformSupplementBar;
