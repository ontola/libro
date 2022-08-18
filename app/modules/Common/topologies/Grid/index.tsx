import { GridTypeMap, Grid as MaterialGrid } from '@mui/material';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import Suspense from '../../../Kernel/components/Suspense';
import { LoadingFullResource } from '../../components/Loading';
import { gridTopology } from '../index';

type GridProps = GridTypeMap['props'] & { className?: string; };

const GridTopology = createTopologyProvider(gridTopology);

const Grid: TopologyFC<GridProps> = ({ children, ...muiGridProps }) => (
  <GridTopology>
    <Suspense fallback={<LoadingFullResource />}>
      <MaterialGrid
        container
        spacing={6}
        {...muiGridProps}
      >
        {children}
      </MaterialGrid>
    </Suspense>
  </GridTopology>
);

export default Grid;
