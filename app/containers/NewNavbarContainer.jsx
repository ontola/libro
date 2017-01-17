import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchActor } from 'state/currentActors/actions';
import {
  NavBarContent,
} from 'components';

const propTypes = {
  actorType: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  shortname: PropTypes.string,
  finishedIntro: PropTypes.bool,
  loadActor: PropTypes.func,
};

class NavbarContainer extends Component {
  componentWillMount() {
    this.props.loadActor();
  }

  render() {
    return (
      <NavBarContent
        actorType={this.props.actorType}
        finishedIntro={this.props.finishedIntro}
        displayName={this.props.displayName}
        shortname={this.props.shortname}
      />);
  }
}

NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    actorType: state.getIn(['currentActors', 'actorType']),
    finishedIntro: state.getIn(['currentActors', 'finishedIntro']),
    displayName: state.getIn(['currentActors', 'displayName']),
    shortname: state.getIn(['currentActors', 'shortname']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadActor: () => dispatch(fetchActor()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
