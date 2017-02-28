import { LinkedObjectContainer } from 'link-redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { voteMatchTransitionTo } from 'state/voteMatch/actions';

const propTypes = {
  step: PropTypes.number,
};

class LinkVoteMatchContainer extends Component {
  componentWillReceiveProps({ step }) {
    if (step !== this.props.step) {
      document.getElementById(`voteMatch-step-${step}`).scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return <LinkedObjectContainer {...this.props} />;
  }
}

LinkVoteMatchContainer.propTypes = propTypes;

export default connect(
  undefined,
  dispatch => ({
    handleStart: () => { dispatch(voteMatchTransitionTo(0)); },
  })
)(LinkVoteMatchContainer);
