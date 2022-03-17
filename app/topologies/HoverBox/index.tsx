import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

import { HoverBoxImpl, HoverBoxProps } from './HoverBoxImpl';

export const hoverBoxTopology = argu.ns('cardHover');

/**
 * Mouse-first component designed to add some extra info where requested. Since it uses 'hover'
 * state, make sure to add functionality for touch users.
 * @returns {component} Component
 */
class HoverBox extends TopologyProvider<HoverBoxProps> {
  constructor(props: HoverBoxProps) {
    super(props);
    this.topology = hoverBoxTopology;
  }

  render() {
    return this.wrap((
      <HoverBoxImpl
        {...this.props}
      >
        {this.props.children}
      </HoverBoxImpl>
    ));
  }
}

export { HoverBoxProps } from './HoverBoxImpl';
export default HoverBox;
