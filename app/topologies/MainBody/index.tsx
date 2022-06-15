import { Container as MUIContainer } from '@mui/material';
import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { mainBodyTopology } from '../../topologies';

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

type MainBodyProps = React.PropsWithChildren<WithStyles<typeof styles>>;

class MainBody extends TopologyProvider<MainBodyProps> {
  constructor(props: MainBodyProps) {
    super(props);

    this.topology = mainBodyTopology;
  }

  render() {
    return (
      <div className={this.props.classes.wrapper}>
        <MUIContainer
          className={this.props.classes.paper}
          maxWidth="xl"
        >
          {this.wrap(this.props.children)}
        </MUIContainer>
      </div>
    );
  }
}

export default withStyles(styles)(MainBody);
