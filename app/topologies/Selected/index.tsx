import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const selectedTopology = argu.ns('selected');

class Selected<P = {}> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.topology = selectedTopology;
  }

  public render() {
    const {
      children,
      ...props
    } = this.props;

    return this.wrap((
      <div {...props}>
        {children}
      </div>
    ));
  }
}

export default Selected;
