import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

export const omniformSupplementBarTopology = argu.ns('omniformSupplementBar');

class OmniformSupplementBar extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = omniformSupplementBarTopology;
  }

  public render() {
    return this.wrap((
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ));
  }
}

export default OmniformSupplementBar;
