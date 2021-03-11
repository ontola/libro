import { TopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import VerticalScroller from '../../components/VerticalScroller';
import argu from '../../ontology/argu';
import { CardFloat } from '../Card';

import './DetailsBar.scss';

export const detailsBarTopology = argu.detail;

interface PropTypes {
  className?: string;
  right?: ReactNode;
  scrollable?: boolean;
}

class DetailsBar extends TopologyProvider<PropTypes> {
  public static defaultProps = {
    scrollable: true,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = detailsBarTopology;
  }

  public render() {
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
