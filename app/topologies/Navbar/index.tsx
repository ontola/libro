import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import {
  withStyles,
  withTheme,
} from '@material-ui/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';
import React from 'react';

import app from '../../ontology/app';
import { CSSPropertiesMap, LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

export const navbarTopology = app.ns('topologies/navbar');

interface PropTypes {
  classes: ClassNameMap;
  theme: any;
  fullWidth?: boolean;
}

const styles = (theme: LibroTheme): CSSPropertiesMap => ({
  wrapper: {
    color: theme.appBar.resolveColor(),
    zIndex: theme.zIndex.appBar + 1,
  },
});

class Navbar extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = navbarTopology;
  }

  getClassName(): string | undefined {
    return this.props.classes.wrapper;
  }

  public renderContent() {
    const {
      background,
      height,
      maxWidth,
      position,
    } = this.props.theme.appBar;

    const ToolbarWrapper = this.props.fullWidth ? 'div' : Container;
    const toolbarWrapperProps = this.props.fullWidth ? {} : { maxWidth };

    return this.wrap((subject) => (
      <React.Fragment>
        <AppBar
          className={this.getClassName()}
          color={background}
          elevation={0}
          position={position}
          resource={subject && subject.value}
        >
          <ToolbarWrapper {...toolbarWrapperProps}>
            <Toolbar
              disableGutters
              variant="dense"
            >
              {this.props.children}
            </Toolbar>
          </ToolbarWrapper>
        </AppBar>
        {position === 'fixed' && <div style={{ height }} />}
      </React.Fragment>
    ));
  }
}

export default withTheme(withStyles(styles)(Navbar));
