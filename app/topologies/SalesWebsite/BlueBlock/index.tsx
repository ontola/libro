import { Container as MaterialContainer } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme, Size } from '../../../themes/themes';
import { blueBlockTopology } from '../../../topologies';
import { ContainerProps } from '../../Container';
import Topology, { TopologyContent } from '../../Topology';

const styles = (theme: LibroTheme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: 30,
  },
});

type BlueBlockProps = ContainerProps & Record<string, unknown> & {classes: {
  root: string,
  }};

class BlueBlock<P extends BlueBlockProps = BlueBlockProps> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.topology = blueBlockTopology;
  }

  public renderContent(): TopologyContent {
    const { size, ...otherProps } = this.props;

    return this.wrap((
      <div className={this.props.classes.root}>
        <MaterialContainer
          maxWidth={this.maxWidth(size ?? Size.Large)}
          {...otherProps}
        />
      </div>
    ));
  }

  protected maxWidth(size: Size): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false {
    if (size === Size.Large) {
      return 'xl';
    }

    if (size === Size.Small) {
      return 'md';
    }

    if (size === Size.XSmall) {
      return 'sm';
    }

    return 'lg';
  }
}

// TODO
// @ts-ignore
export default withStyles(styles)(BlueBlock);
