import { Container as MaterialContainer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container, { ContainerProps } from '../../Container';
import { TopologyContent } from '../../Topology';

export const blueBlockTopology = sales.ns('blueBlock');

const styles = (theme: SalesTheme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: 30,
  },
});

type BlueBlockProps = ContainerProps & Record<string, unknown> & {classes: {
  root: string,
  }};

class BlueBlock<P extends BlueBlockProps = BlueBlockProps> extends Container<P> {
  constructor(props: P) {
    super(props);

    this.topology = blueBlockTopology;
  }

  public renderContent(): TopologyContent {
    return this.wrap((
      <div className={this.props.classes.root}>
        <MaterialContainer maxWidth={this.maxWidth()} {...this.props} />
      </div>
    ));
  }
}

// TODO
// @ts-ignore
export default withStyles(styles)(BlueBlock);
