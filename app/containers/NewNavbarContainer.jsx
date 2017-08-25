import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getVoteMatchMotionIdsLength } from 'state/voteMatch/selectors';

import { fetchActor } from 'state/currentActors/actions';
import {
  NavBarContent,
} from '../components';

const propTypes = {
  actorType: PropTypes.string.isRequired,
  loadActor: PropTypes.func,
  redirectUrl: PropTypes.string,
  voteMatchCount: PropTypes.number,
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
        voteMatchCount={this.props.voteMatchCount}
      />);
  }
}

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    actorType: state.getIn(['currentActors', 'actorType']),
    redirectUrl: window.location.href,
    voteMatchCount: getVoteMatchMotionIdsLength(state, { id: 'LocalVoteMatch' }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadActor: () => dispatch(fetchActor()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
