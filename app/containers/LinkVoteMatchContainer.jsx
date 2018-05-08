import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { voteMatchTransitionTo } from 'state/voteMatch/actions';

const propTypes = {
  step: PropTypes.number,
};

class LinkVoteMatchContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.step !== prevProps.step) {
      document
        .getElementById(`voteMatch-step-${this.props.step}`)
        .scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return <LinkedResourceContainer {...this.props} />;
  }
}

LinkVoteMatchContainer.propTypes = propTypes;

export default connect(
  undefined,
  dispatch => ({
    handleStart: () => { dispatch(voteMatchTransitionTo(0)); },
  })
)(LinkVoteMatchContainer);
