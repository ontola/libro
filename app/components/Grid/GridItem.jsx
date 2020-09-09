import { Grid as MaterialGrid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingGridContent } from '../Loading';

const GRID_FULL = 12;
const LG_BASE = 12;
const MD_BASE = 9;
const SM_BASE = 6;
const XS_BASE = 4;

const columnWidth = (base, size, factor) => (
  Math.max(
    0,
    Math.min(
      GRID_FULL,
      size * (GRID_FULL / Math.floor((base / GRID_FULL) * factor))
    )
  )
);

const GridItem = ({
  children,
  Fallback,
  maxColumns,
  size,
  ...otherProps
}) => {
  const lg = columnWidth(LG_BASE, size, maxColumns);
  const md = columnWidth(MD_BASE, size, maxColumns);
  const sm = columnWidth(SM_BASE, size, maxColumns);
  const xs = columnWidth(XS_BASE, size, maxColumns);

  return (
    <MaterialGrid item lg={lg} md={md} sm={sm} xs={xs} {...otherProps}>
      <React.Suspense fallback={Fallback ? <Fallback /> : <LoadingGridContent />}>
        {children}
      </React.Suspense>
    </MaterialGrid>
  );
};

GridItem.defaultProps = {
  maxColumns: 3,
  size: 1,
};

GridItem.propTypes = {
  Fallback: PropTypes.elementType,
  children: PropTypes.node,
  maxColumns: PropTypes.number,
  size: PropTypes.number,
};

export default GridItem;
