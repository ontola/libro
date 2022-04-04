import { withStyles } from '@material-ui/core';
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import VerticalScroller from '../../components/VerticalScroller';
import { detailsBarTopology } from '../../topologies';
import { CardFloat } from '../Card';

import DetailsBarStyles from './DetailsBarStyles';

export interface DetailsBarProps {
  borderBottom: boolean;
  classes: Classes;
  className?: string;
  layoutOnly?: boolean;
  right?: ReactNode;
  scrollable?: boolean;
  variant?: DetailsBarVariant;
}

export enum DetailsBarVariant {
  Default = 'default',
  Wide = 'wide',
}

class DetailsBar extends TopologyProvider<DetailsBarProps> {
  public static defaultProps = {
    borderBottom: true,
    scrollable: true,
    variant: DetailsBarVariant.Default,
  };

  constructor(props: DetailsBarProps) {
    super(props);

    this.topology = detailsBarTopology;
  }

  public render() {
    const IconWrapper = this.props.scrollable ? VerticalScroller : React.Fragment;
    const classes = clsx({
      [this.props.classes.borderBottom]: this.props.borderBottom,
      [this.props.classes.shared]: true,
      [this.props.variant ? this.props.classes[this.props.variant] : '']: this.props.variant,
      [this.props.classes.layoutOnly]: this.props.layoutOnly,
      [this.props.className || '']: this.props.className,
    });

    return this.wrap((
      <div
        className={classes}
        data-test="DetailsBar"
      >
        <IconWrapper>
          {this.props.children}
        </IconWrapper>
        {this.props.right && (
          <div className={this.props.classes.right}>
            <CardFloat>
              {this.props.right}
            </CardFloat>
          </div>
        )}
      </div>
    ));
  }
}

export default withStyles(DetailsBarStyles)(DetailsBar);
