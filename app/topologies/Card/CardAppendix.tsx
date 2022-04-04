import React from 'react';

import { cardAppendixTopology } from '../../topologies';
import Topology, { TopologyContent } from '../Topology';

/**
 * Renders an empty CardAppendix
 * @returns {component} Component
 */
class CardAppendix extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = cardAppendixTopology;
  }

  public renderContent(): TopologyContent {
    return this.wrap(() => (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ));
  }
}

export default CardAppendix;
