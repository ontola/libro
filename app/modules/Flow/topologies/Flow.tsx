import { createStyles, withStyles } from '@mui/styles';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import { flowTopology } from '../../../topologies';

export type FlowProps = Record<string, unknown> & {
  className?: string;
  classes: {
    root: string;
  }
  children: React.ReactNode
};

const styles = () => createStyles({
  root: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw',
  },
});

class Flow<P extends FlowProps = FlowProps> extends TopologyProvider<P> {
  constructor(props: P) {
    super(props);

    this.topology = flowTopology;
  }

  render() {

    return (
      <div className={this.props.classes.root}>
        {this.wrap(this.props.children)}
      </div>
    );
  }
}

export default withStyles(styles)(Flow);
