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

  static defaultProps = {
    scrollable: true,
  };

  render() {
    const IconWrapper = this.props.scrollable ? VerticalScroller : React.Fragment;

    return this.wrap((
      <div className={`DetailsBar theme ${this.props.className || ''}`}>
        <IconWrapper>
          {this.props.children}
        </IconWrapper>
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
