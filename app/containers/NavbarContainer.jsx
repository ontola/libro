import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchActor } from 'state/currentActors/actions';
import UserNavbarContainer from 'containers/UserNavbarContainer';

import {
  ClosedNavbar,
  GuestNavbar,
} from '../components/Navbar/index';

const propTypes = {
  actorType: PropTypes.string.isRequired,
  finishedIntro: PropTypes.bool,
  loadActor: PropTypes.func,
};

class NavbarContainer extends Component {
  componentWillMount() {
    this.props.loadActor();
  }

  component() {
    const { finishedIntro, actorType } = this.props;
    if (actorType === 'User' && !finishedIntro) {
      return ClosedNavbar;
    } else if (actorType === 'User') {
      return UserNavbarContainer;
    }
    return GuestNavbar;
  }

  render() {
    const NavbarComponent = this.component();
    return <NavbarComponent />;
  }
}

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    actorType: state.getIn(['currentActors', 'actorType']),
    finishedIntro: state.getIn(['currentActors', 'finishedIntro']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadActor: () => dispatch(fetchActor()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
