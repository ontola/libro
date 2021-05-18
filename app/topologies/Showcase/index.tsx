import Grid from '@material-ui/core/Grid';
import { GridSpacing } from '@material-ui/core/Grid/Grid';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const showcaseTopology = argu.ns('topologies/showcase');

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
        justify="center"
        spacing={this.props.spacing}
      >
        {children}
      </Grid>
    ));
  }
}

export default Showcase;
