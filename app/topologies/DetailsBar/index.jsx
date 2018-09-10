import { TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './DetailsBar.scss';

export const detailsBarTopology = NS.argu('detail');

class DetailsBar extends TopologyProvider {
  constructor() {
    super();

    this.topology = detailsBarTopology;
  }

  render() {
    return this.wrap((
      <div className="DetailsBar">
        {this.props.children}
        <div className="DetailsBar__right">
          {this.props.right}
        </div>
      </div>
    ));
  }
}

export default DetailsBar;
