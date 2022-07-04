import {
  GridProps,
  GridSize,
  Grid as MaterialGrid,
} from '@mui/material';
import React from 'react';

import LinkLoader from '../../../Kernel/components/LinkLoader';
import Suspense from '../../../Kernel/components/Suspense';

const GRID_FULL = 12;
const LG_BASE = 12;
const MD_BASE = 9;
const SM_BASE = 6;
const XS_BASE = 4;

const columnWidth = (base: number, size: number, factor: number): GridSize => (
  Math.max(
    0,
    Math.min(
      GRID_FULL,
      size * (GRID_FULL / Math.floor((base / GRID_FULL) * factor)),
    ),
  )
);

export interface GridItemProps extends GridProps {
  Fallback?: React.ComponentType,
  children: React.ReactNode,
  maxColumns: number,
  size: number,
}

const GridItem = ({
  children,
  Fallback,
  maxColumns,
  size,
  ...otherProps
}: GridItemProps): JSX.Element => {
  const lg = columnWidth(LG_BASE, size, maxColumns);
  const md = columnWidth(MD_BASE, size, maxColumns);
  const sm = columnWidth(SM_BASE, size, maxColumns);
  const xs = columnWidth(XS_BASE, size, maxColumns);

  return (
    <MaterialGrid
      item
      lg={lg}
      md={md}
      sm={sm}
      xs={xs}
      {...otherProps}
    >
      <Suspense fallback={Fallback ? <Fallback /> : <LinkLoader />}>
        {children}
      </Suspense>
    </MaterialGrid>
  );
};

GridItem.defaultProps = {
  maxColumns: 3,
  size: 1,
};

export default GridItem;
