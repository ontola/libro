import { Container as MUIContainer } from '@material-ui/core';
import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';

export const mainBodyTopology = argu.ns('mainBody');

const styles = (theme: LibroTheme) => createStyles({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '2rem',
    paddingTop: '1rem',
  },
});

type PropType = WithStyles<typeof styles>;
class MainBody extends TopologyProvider<PropType> {
  constructor(props: PropType) {
    super(props);
    this.topology = mainBodyTopology;
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <MUIContainer
          className={this.props.classes.paper}
          maxWidth="lg"
        >
          {this.wrap(this.props.children)}
        </MUIContainer>
      </div>
    );
  }
}

export default withStyles(styles)(MainBody);
