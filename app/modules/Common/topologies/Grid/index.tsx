import { GridTypeMap, Grid as MaterialGrid } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LoadingFullResource } from '../../../Core/components/Loading';
import Suspense from '../../../Core/components/Suspense';
import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

export const gridTopology = libro.topologies.grid;

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
