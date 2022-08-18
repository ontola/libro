import { Grid, GridSpacing } from '@mui/material';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { showcaseTopology } from '../index';

interface ShowcaseProps {
  className?: string;
  spacing?: GridSpacing;
}

const ShowcaseTopology = createTopologyProvider(showcaseTopology);

const Showcase: TopologyFC<ShowcaseProps> = ({ children, className, spacing }) => (
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

Showcase.defaultProps = {
  spacing: 2,
};

export default Showcase;
