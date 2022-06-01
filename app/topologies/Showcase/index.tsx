import React from 'react';

import { showcaseTopology } from '../../topologies';
import Topology from '../Topology';

interface ShowcaseProps {
  className?: string;
}

class Showcase extends Topology<ShowcaseProps> {
  constructor(props: ShowcaseProps) {
    super(props);

    this.topology = showcaseTopology;
  }

  public renderContent(): JSX.Element {
    return this.wrap(
      <div className={this.props.className}>
        { this.props.children }
      </div>,
    );
  }
}

export default Showcase;
