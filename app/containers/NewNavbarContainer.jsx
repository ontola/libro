import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchActor } from 'state/currentActors/actions';
import {
  NavBarContent,
} from 'components';

const propTypes = {
  actorType: PropTypes.string.isRequired,
  loadActor: PropTypes.func,
  redirectUrl: PropTypes.string,
};

class NavbarContainer extends Component {
  componentWillMount() {
    this.props.loadActor();
  }

  render() {
    return (
      <NavBarContent
        actorType={this.props.actorType}
        redirectUrl={this.props.redirectUrl}
      />
    );
  }
}

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    actorType: state.getIn(['currentActors', 'actorType']),
    redirectUrl: window.location.href,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadActor: () => dispatch(fetchActor()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
