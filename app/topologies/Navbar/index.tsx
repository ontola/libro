import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { withTheme } from '@material-ui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { currentLocation } from '../../helpers/paths';
import app from '../../ontology/app';
import { getCurrentUserType } from '../../state/app/selectors';
import Topology from '../Topology';

import './Navbar.scss';

export const navbarTopology = app.ns('topologies/navbar');

interface PropTypes {
  theme: any;
}

class Navbar extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = navbarTopology;
  }

  public renderContent() {
    const {
      background,
      resolveColor,
      height,
      maxWidth,
      position,
    } = this.props.theme.appBar;
    const zIndex = this.props.theme.overrides.MuiAppBar.root.zIndex + 1;
    const color = resolveColor();

    return this.wrap((subject) => (
      <React.Fragment>
        <AppBar
          className={this.getClassName()}
          color={background}
          elevation={0}
          position={position}
          resource={subject && subject.value}
          style={{
            color,
            zIndex,
          }}
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

export default withTheme(withRouter(connect(mapStateToProps)(Navbar)));
