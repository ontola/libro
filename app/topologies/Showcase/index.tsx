import { Grid, GridSpacing } from '@mui/material';
import React from 'react';

import { showcaseTopology } from '../../topologies';
import Topology from '../Topology';

interface ShowcaseProps {
  className?: string;
  spacing?: GridSpacing;
}

class Showcase extends Topology<ShowcaseProps> {
  static defaultProps = {
    spacing: 2,
  };

  constructor(props: ShowcaseProps) {
    super(props);

    this.topology = showcaseTopology;
  }

  public renderContent(): JSX.Element {
    const { children } = this.props;

    return this.wrap((
      <Grid
        container
        className={this.props.className}
        direction="row"
        justifyContent="center"
        spacing={this.props.spacing}
      >
        {children}
      </Grid>
    ));
  }
}

export default Showcase;
