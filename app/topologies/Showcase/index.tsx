import Grid from '@material-ui/core/Grid';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const showcaseTopology = argu.ns('topologies/showcase');

class Showcase extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.topology = showcaseTopology;
  }

  public renderContent(): JSX.Element {
    const { children } = this.props;

    return this.wrap((
      <Grid
        container
        direction="row"
        justify="center"
      >
        {children}
      </Grid>
    ));
  }
}

export default Showcase;
