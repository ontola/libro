import { Grid, GridSpacing } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { showcaseTopology } from '../index';

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
