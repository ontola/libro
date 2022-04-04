import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import { formFooterTopology } from '../../topologies';

const styles = () => createStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

type PropTypes = WithStyles<typeof styles>;

class FormFooter extends TopologyProvider<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = formFooterTopology;
  }

  public render() {
    const className = this.props.classes.wrapper;

    return this.wrap((
      <div className={className}>
        {this.props.children}
      </div>
    ));
  }
}

export default withStyles(styles)(FormFooter);
