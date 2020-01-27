import { Grid as MaterialGrid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingGridContent } from '../Loading';

const GRID_FULL = 12;
const GRID_HALF = 6;
const GRID_SIZE = 3;
const GRID_THIRD = 4;

const GridItem = ({
  children,
  Fallback,
  size,
  ...otherProps
}) => {
  const lg = GRID_FULL / (GRID_THIRD - size);
  const md = size === GRID_SIZE ? GRID_FULL : GRID_HALF;
  const sm = GRID_FULL;

  return (
    <MaterialGrid item lg={lg} md={md} sm={sm} xs={sm} {...otherProps}>
      <React.Suspense fallback={Fallback ? <Fallback /> : <LoadingGridContent />}>
        {children}
      </React.Suspense>
    </MaterialGrid>
  );
};

GridItem.defaultProps = {
  size: 1,
};

GridItem.propTypes = {
  Fallback: PropTypes.elementType,
  children: PropTypes.node,
  size: PropTypes.number,
};

export default GridItem;
