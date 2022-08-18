import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import VerticalScroller from '../../components/VerticalScroller';
import { CardFloat } from '../Card';
import { detailsBarTopology } from '../index';

import detailsBarStyles from './DetailsBarStyles';

interface DetailsBarProps {
  borderBottom?: boolean;
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

const useStyles = makeStyles(detailsBarStyles);

const DetailsBarTopology = createTopologyProvider(detailsBarTopology);

const DetailsBar: TopologyFC<DetailsBarProps> = ({
  children, scrollable, className, variant, layoutOnly, borderBottom, right,
}) => {
  const classes = useStyles();
  const wrapperClass = clsx({
    [classes.borderBottom]: borderBottom,
    [classes.shared]: true,
    [variant ? classes[variant] : '']: variant,
    [classes.layoutOnly]: layoutOnly,
    [className || '']: className,
  });
  const IconWrapper = scrollable ? VerticalScroller : React.Fragment;

  return (
    <DetailsBarTopology>
      <div
        className={wrapperClass}
        data-test="DetailsBar"
      >
        <IconWrapper>
          {children}
        </IconWrapper>
        {right && (
          <div className={classes.right}>
            <CardFloat>
              {right}
            </CardFloat>
          </div>
        )}
      </div>
    </DetailsBarTopology>
  );
};

DetailsBar.defaultProps = {
  borderBottom: true,
  scrollable: true,
  variant: DetailsBarVariant.Default,
};

export default DetailsBar;
