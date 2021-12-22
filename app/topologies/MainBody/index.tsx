import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

export const mainBodyTopology = argu.ns('mainBody');

class MainBody extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.topology = mainBodyTopology;
  }

  render() {
    return (
      <React.Fragment>
        {this.wrap(this.props.children)}
      </React.Fragment>
    );
  }
}

export default MainBody;
