import React from 'react';

import argu from '../../ontology/argu';
import Topology, { TopologyContent } from '../Topology';

export const cardAppendixTopology = argu.ns('cardAppendix');

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
