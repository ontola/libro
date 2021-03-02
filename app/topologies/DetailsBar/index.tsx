import clsx from 'clsx';
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
  variant?: DetailsBarVariant;
}

export enum DetailsBarVariant {
  Wide = 'wide',
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
    const classes = clsx({
      DetailsBar: true,
      [`DetailsBar--variant-${this.props.variant}`]: this.props.variant,
      [this.props.className || '']: this.props.className,
    });

    return this.wrap((
      <div className={classes}>
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
