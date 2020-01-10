import { DEFAULT_TOPOLOGY } from 'link-lib';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Topology from '../Topology';
import Metadata from '../../components/Metadata';

export const primaryResourceTopology = DEFAULT_TOPOLOGY;

class PrimaryResource extends Topology {
  static displayName = 'PrimaryResource';

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'PrimaryResource';
    this.topology = primaryResourceTopology;
  }

  wrap(children) {
    return TopologyProvider.prototype.wrap.call(
      this,
      (subject) => (
        <React.Fragment>
          <Metadata />
          {typeof children === 'function' ? children(subject) : children}
        </React.Fragment>
      )
    );
  }
}

export default PrimaryResource;
