import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import {
  withStyles,
  withTheme,
} from '@material-ui/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles/withStyles';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { currentLocation } from '../../helpers/paths';
import app from '../../ontology/app';
import { getCurrentUserType } from '../../state/app/selectors';
import { CSSPropertiesMap, LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

export const navbarTopology = app.ns('topologies/navbar');

interface PropTypes {
  classes: ClassNameMap;
  theme: any;
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

    return this.wrap((subject) => (
      <React.Fragment>
        <AppBar
          className={this.getClassName()}
          color={background}
          elevation={0}
          position={position}
          resource={subject && subject.value}
        >
          <Container maxWidth={maxWidth}>
            <Toolbar
              disableGutters
              variant="dense"
            >
              {this.props.children}
            </Toolbar>
          </Container>
        </AppBar>
        {position === 'fixed' && <div style={{ height }} />}
      </React.Fragment>
    ));
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    actorType: getCurrentUserType(state),
    redirectUrl: currentLocation(ownProps.location),
  };
}

export default withTheme(withRouter(connect(mapStateToProps)(withStyles(styles)(Navbar))));
