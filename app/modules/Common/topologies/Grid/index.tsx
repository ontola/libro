import { GridTypeMap, Grid as MaterialGrid } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';

export const gridTopology = libro.topologies.grid;

type GridProps = GridTypeMap['props'] & { className?: string; };

const Grid: TopologyFC<GridProps> = ({ children, ...muiGridProps }) => {
  const [GridTopology] = useTopologyProvider(gridTopology);

  return (
    <GridTopology>
      <MaterialGrid
        container
        spacing={6}
        {...muiGridProps}
      >
        {children}
      </MaterialGrid>
    </GridTopology>
  );
};

export default Grid;
