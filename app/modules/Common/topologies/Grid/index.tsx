import { GridTypeMap, Grid as MaterialGrid } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import Suspense from '../../../Kernel/components/Suspense';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { LoadingFullResource } from '../../components/Loading';
import { gridTopology } from '../index';

type GridProps = GridTypeMap['props'] & { className?: string; };

const Grid: TopologyFC<GridProps> = ({ children, ...muiGridProps }) => {
  const [GridTopology] = useTopologyProvider(gridTopology);

  return (
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
};

export default Grid;
