import { TopologyProvider } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardFloat } from '../Card';
import { VerticalScroller } from '../../components';

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
        <VerticalScroller>
          {this.props.children}
        </VerticalScroller>
        {this.props.right && (
        <div className="DetailsBar__right">
          <CardFloat>
            {this.props.right}
          </CardFloat>
        </div>
        )}
      </div>
    ));
  }
}

export default DetailsBar;
