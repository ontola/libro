import { TopologyProvider } from 'link-redux';
import React from 'react';

import VerticalScroller from '../../components/VerticalScroller';
import { CardFloat } from '../Card';
import argu from '../../ontology/argu';

import './DetailsBar.scss';

export const detailsBarTopology = argu.detail;

class DetailsBar extends TopologyProvider {
  constructor() {
    super();

    this.topology = detailsBarTopology;
  }

  render() {
    return this.wrap((
      <div className={`DetailsBar theme ${this.props.className || ''}`}>
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
