import { Container as MaterialContainer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../../themes/themes';
import { blueBlockTopology } from '../../../topologies';
import Container, { ContainerProps } from '../../Container';
import { TopologyContent } from '../../Topology';

const styles = (theme: LibroTheme) => ({
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
        <MaterialContainer
          maxWidth={this.maxWidth()}
          {...this.props}
        />
      </div>
    ));
  }
}

// TODO
// @ts-ignore
export default withStyles(styles)(BlueBlock);
