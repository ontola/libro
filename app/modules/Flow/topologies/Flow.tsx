import { createStyles } from '@material-ui/styles';
import withStyles from '@material-ui/styles/withStyles';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';

export const flowTopology = argu.ns('flow');

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
