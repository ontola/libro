import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VoteMatchShow } from 'components';
import { voteMatchStart } from 'state/votematch/actions';

import {
  getVoteMatchMotions,
  getVoteMatchCountUserVotes,
} from 'state/votematch/selectors';

const propTypes = {
  countUserVotes: PropTypes.number,
  id: PropTypes.string.isRequired,
  motionIds: PropTypes.node,
  onStartVoteMatch: PropTypes.func.isRequired,
};

const defaultProps = {
  motionIds: [],
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
        currentIndex={this.props.countUserVotes}
        motionIds={this.props.motionIds}
      />
    );
  }
}

VoteMatchContainer.propTypes = propTypes;
VoteMatchContainer.defaultProps = defaultProps;

export default connect(
  (state, props) => ({
    countUserVotes: getVoteMatchCountUserVotes(state, props),
    motionIds: getVoteMatchMotions(state, props),
  }),
  (dispatch) => ({
    onStartVoteMatch: (record) => dispatch(voteMatchStart(record)),
  })
)(VoteMatchContainer);
