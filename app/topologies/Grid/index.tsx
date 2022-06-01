import { GridTypeMap, Grid as MaterialGrid } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LoadingFullResource } from '../../modules/Core/components/Loading';
import Suspense from '../../modules/Core/components/Suspense';
import { gridTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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
