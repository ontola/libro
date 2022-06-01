import { Grid, GridSpacing } from '@mui/material';
import React from 'react';
import { useTopologyProvider } from 'link-redux';

import { showcaseTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

interface ShowcaseProps {
  className?: string;
  spacing?: GridSpacing;
}

const Showcase: TopologyFC<ShowcaseProps> = ({ children, className, spacing }) => {
  const [ShowcaseTopology] = useTopologyProvider(showcaseTopology);

  return (
    <ShowcaseTopology>
      <Grid
        container
        className={className}
        direction="row"
        justifyContent="center"
        spacing={spacing}
      >
        {children}
      </Grid>
    </ShowcaseTopology>
  );
};

Showcase.defaultProps = {
  spacing: 2,
};

export default Showcase;
