import { useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { checkLuminance, hexToRgb } from '../../helpers/color';
import { currentLocation } from '../../helpers/paths';
import app from '../../ontology/app';
import { getCurrentUserType } from '../../state/app/selectors';
import Topology from '../Topology';

import './Navbar.scss';

export const navbarTopology = app.ns('topologies/navbar');

const Test = (props) => {
  const theme = useTheme(props);

  return (
    <AppBar
      className={props.className}
      position={theme.ontola.appbar.position}
      resource={props.resource}
      style={props.style}
    >
      {props.children}
    </AppBar>
  );
};

Test.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  resource: PropTypes.string,
  style: PropTypes.string,
};

class Navbar extends Topology {
  constructor(props) {
    super(props);

    const textColor = __CLIENT__
      ? getComputedStyle(document.body).getPropertyValue('--navbar-color')
      : 'black';
    // TODO: move to theme or makeStyles
    this.className = [
      checkLuminance(hexToRgb(textColor)) ? 'Navbar--dark-text' : 'Navbar--white-text',
    ].join(' ');

    this.topology = navbarTopology;
  }

  renderContent() {
    const position = 'static';

    return this.wrap((subject) => (
      <React.Fragment>
        <Test
          className={this.getClassName()}
          resource={subject && subject.value}
          style={this.getStyle()}
        >
          <Container>
            <Toolbar variant="dense">
              {this.props.children}
            </Toolbar>
          </Container>
        </Test>
        {position === 'fixed' && <Toolbar />}
      </React.Fragment>
    ));
  }
}

function mapStateToProps(state, ownProps) {
  return {
    actorType: getCurrentUserType(state),
    redirectUrl: currentLocation(ownProps.location),
  };
}

export default withRouter(connect(mapStateToProps)(Navbar));
