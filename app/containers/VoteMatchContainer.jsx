import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VoteMatchShow } from 'components';
import { getVoteMatchMotions, getVoteMatchCurrentIndex } from 'state/votematch/selectors';
import { voteMatchStart } from 'state/votematch/actions';

const propTypes = {
  currentIndex: PropTypes.number,
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onStartVoteMatch: PropTypes.func.isRequired,
};

const defaultProps = {
  motionIds: [],
  currentIndex: 0,
};

class VoteMatchContainer extends Component {
  componentWillMount() {
    this.props.onStartVoteMatch({
      id: this.props.id,
    });
  }

  render() {
    return (
      <VoteMatchShow
        voteMatchId={this.props.id}
        currentIndex={this.props.currentIndex}
        motionIds={this.props.motionIds}
      />
    );
  }
}

VoteMatchContainer.propTypes = propTypes;
VoteMatchContainer.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    currentIndex: getVoteMatchCurrentIndex(state, props),
    motionIds: getVoteMatchMotions(state, props),
  }),
  (dispatch) => ({
    onStartVoteMatch: (record) => dispatch(voteMatchStart(record)),
  })
)(VoteMatchContainer);
